export class PeopleGenerator {

    constructor(building) {
        this.building = building;
        this.elevatorsObjectives = new Map();

        this.building.elevators.forEach(elevator => {
            this._setElevatorObjective(elevator, this.building.getFloorById(0));
        });

    }

}