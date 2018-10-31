import { ELEVATOR_STATE_ENUM, ENTRANCE_HALL_Y, TOP_FLOOR_Y, ELEVATOR_CAPACITY } from '../config.js';

export class Elevator {

    constructor(id, position) {
        this.id = id;
        this.position = position;
        this.state = ELEVATOR_STATE_ENUM.READY;
        this.people = [];
    }

    moveUp() {
        if (this.position.y > TOP_FLOOR_Y) {
            this.position.y -= 1;
            this.people.forEach(person => person.position.y -= 1);
            this.changeState(ELEVATOR_STATE_ENUM.GOING_UP);
        }
    }

    moveDown() {
        if (this.position.y < ENTRANCE_HALL_Y) {
            this.position.y += 1;
            this.people.forEach(person => person.position.y += 1);
            this.changeState(ELEVATOR_STATE_ENUM.GOING_DOWN);
        }
    }

    changeState(state) {
        this.state = state;
    }

    isReady() {
        return this.state === ELEVATOR_STATE_ENUM.READY;
    }

    isGoingUp() {
        return this.state === ELEVATOR_STATE_ENUM.GOING_UP;
    }

    isGoingDown() {
        return this.state === ELEVATOR_STATE_ENUM.GOING_DOWN;
    }

    isPickingUpPeople() {
        return this.state === ELEVATOR_STATE_ENUM.PICKING_UP_PEOPLE;
    }

    isFull() {
        return this.people.length === ELEVATOR_CAPACITY;
    }

    isEmpty() {
        return this.people.length === 0;
    }

    isWaitingForPeopleToLeave() {
        return this.state === ELEVATOR_STATE_ENUM.WAITING_FOR_PEOPLE_TO_LEAVE;
    }

}