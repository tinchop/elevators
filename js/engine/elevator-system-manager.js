import { ELEVATOR_CAPACITY, ELEVATOR_STATE_ENUM } from '../config.js';


export class ElevatorSystemManager {

    constructor(building) {
        this.building = building;
        this.elevatorsObjectives = new Map();
        this.building.elevators.forEach(elevator => {
            this._setElevatorObjective(elevator, this.building.getFloorById(5));
        });

    }

    manage() {
        this.building.elevators.forEach(elevator => {
            if (!this._isElevatorInObjective(elevator)) {
                this._moveElevatorToObjective(elevator);
            } else {
                let objective = this.elevatorsObjectives.get(elevator);
                if (!elevator.isPickingUpPeople()) {
                    elevator.changeState(ELEVATOR_STATE_ENUM.PICKING_UP_PEOPLE);
                    // setTimeout(function(){ 
                         
                
                    // }, 1000);
                }
            }
        });
    }

    _isElevatorInObjective(elevator) {
        let objective = this.elevatorsObjectives.get(elevator);
        return objective.position.y === elevator.position.y;
    }

    _setElevatorObjective(elevator, objective) {
        this.elevatorsObjectives.set(elevator, objective);
    }

    _pickUpPeople(elevator, floor) {
        let room = ELEVATOR_CAPACITY - elevator.people.length;
        for (let i = 0; i < room; i++) {
            if (floor.arePeopleWaiting()) {
                let person = floor.peopleWaiting.splice(-1, 1)[0];
                elevator.people.push(person);
            }
        }

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