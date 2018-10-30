export class ElevatorSystemManager {

    constructor(building) {
        this.building = building;
        this.elevatorsObjectives = new Map();
        this.building.elevators.forEach(elevator => {
            this.elevatorsObjectives.set(elevator, this.building.getFloorById(5));
        });

    }

    manage() {
        this.building.elevators.forEach(this._moveElevatorToObjective, this);
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