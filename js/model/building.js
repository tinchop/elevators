import {Floor} from './floor.js';
import * as config from './../config.js';
import { Elevator } from './elevator.js';
import { Position } from './position.js';

export class Building {

    constructor() {
        this.floors = [];
        for (let i = 0; i <= config.NUMBER_OF_FLOORS; i++) {
            this.floors.push(new Floor(i, new Position(0, config.FLOOR_HEIGHT * i)));
        }
        this.elevators = [];
        this.elevators.push(new Elevator(1, new Position(400, 0)));
        this.elevators.push(new Elevator(2, new Position(500, 300)));
        this.elevators.push(new Elevator(3, new Position(600, 600)));
    }


    update() {
        this.elevators[0].position.y += 1;
        this.elevators[1].position.y += 1;
        this.elevators[2].position.y -= 1;
    }

    getElevators() {
        return this.elevators;
    }

    getFloors() {
        return this.floors;
    }

}