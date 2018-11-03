import { ELEVATOR_CAPACITY, ELEVATOR_STATE_ENUM, PEOPLE_DISTANCE_IN_LINE, ELEVATOR_WAITING_TIME } from '../config.js';
import { stats } from '../stats/stats.js';


export class ElevatorSystemManager {

    constructor(building) {
        this.building = building;
        this.elevatorsObjectives = new Map();

        this.building.elevators.forEach(elevator => {
            this._setElevatorObjective(elevator, this.building.getFloorById(0));
        });

    }

    manage() {
        this.building.elevators.forEach(elevator => {
            if (!this._isElevatorInObjective(elevator)) {
                this._searchForBetterObjective(elevator);
                this._moveElevatorToObjective(elevator);
            } else {
                let objective = this.elevatorsObjectives.get(elevator);
                if (objective.id === 0 && !elevator.isEmpty() && !elevator.isWaitingForPeopleToLeave()) {
                    elevator.changeState(ELEVATOR_STATE_ENUM.WAITING_FOR_PEOPLE_TO_LEAVE);
                    setTimeout(this._waitForPeopleToLeave, ELEVATOR_WAITING_TIME, elevator, this);
                } else if (objective.id != 0 && !elevator.isPickingUpPeople() && !elevator.isFull()) {
                    elevator.changeState(ELEVATOR_STATE_ENUM.PICKING_UP_PEOPLE);
                    setTimeout(this._doPickUpPeople, ELEVATOR_WAITING_TIME, elevator, objective, this);
                } else if (elevator.isReady()) {
                    this._doMoveToNextObjective(elevator, this);
                } 
            }
        });
    }

    _searchForBetterObjective(elevator) {
        if (elevator.isFull()) {
            return;
        } else {
            let objective = this.elevatorsObjectives.get(elevator);
            let objectiveIdsToExclude = this._currentObjectivesIds();
            if (elevator.isGoingUp()) {
                let highest = this.building.getHighestFloorRequestingElevators(objectiveIdsToExclude);
                if (highest && highest.id > objective.id) {
                    this._setElevatorObjective(elevator, highest);
                }
            } else if (elevator.isGoingDown()) {
                let better = this.building.getClosestFloorRequestingElevatorsBelowFloor(this.building.getFloorIdByY(elevator.position.y), objectiveIdsToExclude, elevator.people.length < 2);
                if (better) {
                    this._setElevatorObjective(elevator, better);
                }
            }
        }
    }

    _waitForPeopleToLeave(elevator, dis) {
        elevator.people.forEach(person => {
            stats.updateTimeInSystem(person);
            person.leftBuilding = true;
            person.position.x = -100;
        });
        elevator.people = [];
        setTimeout(dis._doMoveToNextObjective, ELEVATOR_WAITING_TIME, elevator, dis);
    }

    _doPickUpPeople(elevator, floor, dis) {
        let room = ELEVATOR_CAPACITY - elevator.people.length;
        for (let i = 0; i < room; i++) {
            if (floor.arePeopleWaiting()) {
                let person = floor.peopleWaiting.splice(0, 1)[0];
                elevator.people.push(person);
            }
        }
        floor.reorderPeopleWaiting();
        for (let i = 0; i < elevator.people.length; i++) {
            let person = elevator.people[i];
            person.position.x = elevator.position.x + 10 + i * PEOPLE_DISTANCE_IN_LINE;
        }
        setTimeout(dis._doMoveToNextObjective, ELEVATOR_WAITING_TIME, elevator, dis);
    }

    _doMoveToNextObjective(elevator, dis) {
        if (dis._isElevatorInObjective(elevator)) {
            let floorIdsToExclude = dis._currentObjectivesIds();
            let objective = dis.elevatorsObjectives.get(elevator);
            if (elevator.isFull()) {
                dis._setElevatorObjective(elevator, dis.building.getFloorById(0));
            } else if (objective.id != 0) {
                let floor = dis.building.getClosestFloorRequestingElevatorsBelowFloor(objective.id, floorIdsToExclude);
                dis._setElevatorObjective(elevator, floor ? floor : dis.building.getFloorById(0));
            } else {
                let floor = dis.building.getHighestFloorRequestingElevators(floorIdsToExclude);
                if (floor) {
                    dis._setElevatorObjective(elevator, floor);
                }
            }
            elevator.changeState(ELEVATOR_STATE_ENUM.READY);
        }
    }

    _currentObjectivesIds() {
        return Array.from(this.elevatorsObjectives.values()).map(objective => objective.id);
    }

    _isElevatorInObjective(elevator) {
        let objective = this.elevatorsObjectives.get(elevator);
        return objective.position.y === elevator.position.y;
    }

    _setElevatorObjective(elevator, objective) {
        this.elevatorsObjectives.set(elevator, objective);
    }

    _moveElevatorToObjective(elevator) {
        let objective = this.elevatorsObjectives.get(elevator);
        if (objective.position.y < elevator.position.y) {
            elevator.moveUp();
        } else if (objective.position.y > elevator.position.y) {
            elevator.moveDown();
        }
    }

}