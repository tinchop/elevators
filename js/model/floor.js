import { PEOPLE_DISTANCE_IN_LINE, MAX_PEOPLE_WAITING } from '../config.js';

export class Floor {

    constructor(id, position, isInEfficientBuilding) {
        this.id = id;
        this.isInEfficientBuilding = isInEfficientBuilding;
        this.peopleWaiting = [];
        this.position = position;
    }

    isInEfficientBuilding() {
        return this.isInEfficientBuilding;
    }

    reorderPeopleWaiting() {
        if (this.arePeopleWaiting()) {
            for (let i = 0; i < this.peopleWaiting.length; i++) {
                let person = this.peopleWaiting[i];
                person.position.x = (this.isInEfficientBuilding ? 615 : 190) - (i + 1) * PEOPLE_DISTANCE_IN_LINE;
            }
        }
    }

    hasRoom() {
        return this.peopleWaiting.length < MAX_PEOPLE_WAITING;
    }

    arePeopleWaiting() {
        return this.peopleWaiting.length > 0;
    }

}