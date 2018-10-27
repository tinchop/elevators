import {Person} from './person.js';
import { Position } from './position.js';
import { MAX_PEOPLE_WAITING } from '../config.js';

export class Floor {

    constructor(id, position) {
        this.id = id;
        this.peopleWaiting = [];
        this.position = position;
    }

    createPerson() {
        if (this.peopleWaiting.length < MAX_PEOPLE_WAITING) {
            let position = new Position(400 - ((this.peopleWaiting.length+1)*30), this.position.y + 10);
            let person = new Person(position);
            this.peopleWaiting.push(person);
        }
    }

    getPeopleWaiting() {
        return this.peopleWaiting;
    }

}