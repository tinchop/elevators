import {Person} from './person.js';

export class Floor {

    constructor(id, position) {
        this.id = id;
        this.peopleWaiting = [];
        this.position = position;
    }

}