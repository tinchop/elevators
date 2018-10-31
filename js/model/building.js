import * as config from './../config.js';
import { Elevator } from './elevator.js';
import { Floor } from './floor.js';
import { Position } from './position.js';

export class Building {

    constructor() {
        this.floors = [];
        for (let i = 0; i <= config.NUMBER_OF_FLOORS; i++) {
            this.floors.push(new Floor(10 - i, new Position(0, config.FLOOR_HEIGHT * i)));
        }
        this.elevators = [];
        this.elevators.push(new Elevator(1, new Position(400, config.ENTRANCE_HALL_Y)));
        this.elevators.push(new Elevator(2, new Position(500, config.ENTRANCE_HALL_Y)));
        this.elevators.push(new Elevator(3, new Position(600, config.ENTRANCE_HALL_Y)));
    }


    update() {
        this.createPerson();
    }

    createPerson() {
        let randomInt = (Math.floor(Math.random() * config.PERSON_CREATION_COEFFICIENT) + 1);
        if (randomInt == config.PERSON_CREATION_COEFFICIENT) {
            let randomFloorIndex = (Math.floor(Math.random() * config.NUMBER_OF_FLOORS));
            this.floors[randomFloorIndex].createPerson();
        }
    }

    getFloorsRequestingElevators(idsToExclude) {
        let floorsRequestingElevators = [];
        this.floors.forEach(floor => {
            if (floor.peopleWaiting.length > 0 && (!idsToExclude || !idsToExclude.includes(floor.id))) {
                floorsRequestingElevators.push(floor);
            }
        });
        return floorsRequestingElevators;
    }

    getRandomFloorRequestingElevator() {
        let floorsRequestingElevator = this.getFloorsRequestingElevators();
        if (floorsRequestingElevator.length > 0) {
            return floorsRequestingElevator[(Math.floor(Math.random() * floorsRequestingElevator.length))];
        } else {
            return null;
        }
    }

    getClosestFloorRequestingElevatorsBelowFloor(floorId, idsToExclude) {
        let floorsRequestingElevators = [];
        this.floors.forEach(floor => {
            if (floor.peopleWaiting.length > 0 && (floorId > floor.id || floorId + config.GO_BACKWARDS_THRESHOLD == floor.id) && !idsToExclude.includes(floor.id)) {
                floorsRequestingElevators.push(floor);
            }
        });
        if (floorsRequestingElevators.length === 0) {
            return null;
        }
        floorsRequestingElevators.sort((a, b) => b.id - a.id);
        return floorsRequestingElevators[0];
    }

    getClosestFloorRequestingElevatorsBelowFloorWithoutThreshold(floorId) {
        let floorsRequestingElevators = [];
        this.floors.forEach(floor => {
            if (floor.peopleWaiting.length > 0 && (floorId > floor.id)) {
                floorsRequestingElevators.push(floor);
            }
        });
        if (floorsRequestingElevators.length === 0) {
            return null;
        }
        floorsRequestingElevators.sort((a, b) => b.id - a.id);
        return floorsRequestingElevators[0];
    }

    getFloorIdByY(y) {
        return 10 - Math.floor(y / config.FLOOR_HEIGHT);
    }

    getHighestFloorRequestingElevators(idsToExclude) {
        let floorsRequestingElevators = this.getFloorsRequestingElevators(idsToExclude);
        if (floorsRequestingElevators.length === 0) {
            return null;
        }
        floorsRequestingElevators.sort((a, b) => b.id - a.id);
        //console.log('highest floor requesting elevator ', floorsRequestingElevators[0].id);
        return floorsRequestingElevators[0];
    }

    getFloorById(id) {
        return this.floors.find(floor => floor.id === id);
    }

}