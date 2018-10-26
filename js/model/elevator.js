import {Person} from './person.js';
import { ELEVATOR_STATE_ENUM, TOP_FLOOR_Y, ENTRANCE_HALL_Y } from '../config.js';
import { Position } from './position.js';

export class Elevator {

    constructor(id, position) {
        this.id = id;
        this.position = position;
        this.people = [new Person(new Position(this.position.x + 20, this.position.y + 11))];
        this.state = ELEVATOR_STATE_ENUM.GOING_DOWN;
    }

    moveUp() {
        if (this.position.y > TOP_FLOOR_Y) {
            this.position.y -= 1;
            this.people.forEach(person => {
                person.position.y -= 1;
            })
            this.state = ELEVATOR_STATE_ENUM.GOING_UP;
        } else {
            this.state = ELEVATOR_STATE_ENUM.STILL;
        }
    }

    moveDown() {
        if (this.position.y < ENTRANCE_HALL_Y) {
            this.position.y += 1;
            this.people.forEach(person => {
                person.position.y += 1;
            })
            this.state = ELEVATOR_STATE_ENUM.GOING_DOWN;
        } else {
            this.state = ELEVATOR_STATE_ENUM.STILL;
        }
    }

}