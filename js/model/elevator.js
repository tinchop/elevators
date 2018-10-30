import { ELEVATOR_STATE_ENUM, ENTRANCE_HALL_Y, TOP_FLOOR_Y } from '../config.js';

export class Elevator {

    constructor(id, position) {
        this.id = id;
        this.position = position;
        this.state = ELEVATOR_STATE_ENUM.STILL;
        this.people = [];
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