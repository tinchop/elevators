import { MAX_PEOPLE_WAITING, PEOPLE_DISTANCE_IN_LINE } from '../config.js';
import { Person } from './person.js';
import { Position } from './position.js';

export class Floor {

    constructor(id, position) {
        this.id = id;
        this.peopleWaiting = [];
        this.position = position;
    }

    createPerson() {
        if (this.peopleWaiting.length < MAX_PEOPLE_WAITING) {
            let position = new Position(400 - ((this.peopleWaiting.length + 1) * PEOPLE_DISTANCE_IN_LINE), this.position.y + 10);
            let person = new Person(position);
            this.peopleWaiting.push(person);
        }
    }

}