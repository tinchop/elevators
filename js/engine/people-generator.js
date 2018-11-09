import { NUMBER_OF_FLOORS, PEOPLE_DISTANCE_IN_LINE, PERSON_CREATION_COEFFICIENT } from '../config.js';
import { stats } from '../stats/stats.js';
import { Position } from './../model/position.js';
import { Person } from './../model/person.js';

export class PeopleGenerator {

    constructor(efficientBuilding, inefficientBuilding) {
        this.efficientBuilding = efficientBuilding;
        this.inefficientBuilding = inefficientBuilding;
    }

    createPerson() {
        let randomInt = (Math.floor(Math.random() * PERSON_CREATION_COEFFICIENT) + 1);
        if (randomInt == PERSON_CREATION_COEFFICIENT) {
            let randomFloorIndex = (Math.floor(Math.random() * NUMBER_OF_FLOORS));
            let efficientFloor = this.efficientBuilding.floors[randomFloorIndex];
            let inefficientFloor = this.inefficientBuilding.floors[randomFloorIndex];

            if (efficientFloor.hasRoom() && inefficientFloor.hasRoom()) {
                let position = new Position(190 - ((inefficientFloor.peopleWaiting.length + 1) * PEOPLE_DISTANCE_IN_LINE), inefficientFloor.position.y + 10);
                let person = new Person(position, inefficientFloor.id, true);
                inefficientFloor.peopleWaiting.push(person);
                stats.updatePeopleCreated(inefficientFloor.id);

                let position2 = new Position(615 - ((efficientFloor.peopleWaiting.length + 1) * PEOPLE_DISTANCE_IN_LINE), efficientFloor.position.y + 10);
                let person2 = new Person(position2, efficientFloor.id, true);
                efficientFloor.peopleWaiting.push(person2);
            }
        }
    }

}