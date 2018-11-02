import { MAX_PEOPLE_WAITING, PEOPLE_DISTANCE_IN_LINE } from '../config.js';
import { Person } from './person.js';
import { Position } from './position.js';
import { stats } from '../stats/stats.js';

export class Floor {

    constructor(id, position) {
        this.id = id;
        this.peopleWaiting = [];
        this.position = position;
    }

    createPerson() {
        if (this.peopleWaiting.length < MAX_PEOPLE_WAITING) {
            let position = new Position(400 - ((this.peopleWaiting.length + 1) * PEOPLE_DISTANCE_IN_LINE), this.position.y + 10);
            let person = new Person(position, this.id);
            this.peopleWaiting.push(person);
            stats.updatePeopleCreated(this.id);
        }
    }

    reorderPeopleWaiting() {
        if (this.arePeopleWaiting()) {
            for (let i = 0; i < this.peopleWaiting.length; i++) {
                let person = this.peopleWaiting[i];
                person.position.x = 400 - (i + 1) * PEOPLE_DISTANCE_IN_LINE;
            }
        }
    }

    arePeopleWaiting() {
        return this.peopleWaiting.length > 0;
    }

}