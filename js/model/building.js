import {Floor} from './floor.js';
import * as config from './../config.js';
import { Elevator } from './elevator.js';
import { Position } from './position.js';

export class Building {

    constructor() {
        this.floors = [];
        for (let i = 0; i < config.NUMBER_OF_FLOORS; i++) {
            this.floors.push(new Floor(10 - i, new Position(0, config.FLOOR_HEIGHT * i)));
        }
        this.elevators = [];
        this.elevators.push(new Elevator(1, new Position(400, config.ENTRANCE_HALL_Y)));
        this.elevators.push(new Elevator(2, new Position(500, config.ENTRANCE_HALL_Y)));
        this.elevators.push(new Elevator(3, new Position(600, config.ENTRANCE_HALL_Y)));
    }


    update() {
        this.elevators.forEach(function (elevator) {
            elevator.moveDown();
        });
        this.createPerson();
    }

    createPerson() {
        let randomInt = (Math.floor(Math.random() * config.PERSON_CREATION_COEFFICIENT) + 1);
        if (randomInt == config.PERSON_CREATION_COEFFICIENT) {
            let randomFloorIndex = (Math.floor(Math.random() * config.NUMBER_OF_FLOORS));
            this.floors[randomFloorIndex].createPerson();
        }
    }

    getElevators() {
        return this.elevators;
    }

    getFloors() {
        return this.floors;
    }

}