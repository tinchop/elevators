import {Floor} from './floor.js';
import * as config from './../config.js';
import { Elevator } from './elevator.js';
import { Position } from './position.js';

export class Building {

    constructor() {
        this.floors = [];
        for (let i = 0; i <= config.NUMBER_OF_FLOORS; i++) {
            this.floors.push(new Floor(i, new Position(300, config.FLOOR_HEIGHT * i)));
        }
        this.elevators = [];
        this.elevators.push(new Elevator(1, new Position(100, 100)));
        this.elevators.push(new Elevator(2, new Position(500, 400)));
        this.elevators.push(new Elevator(3, new Position(900, 700)));
    }


    update() {
        this.elevators[0].position.y += 2;
        this.elevators[1].position.y += 1;
        this.elevators[2].position.y -= 1;
    }

    getElevators() {
        return this.elevators;
    }

}