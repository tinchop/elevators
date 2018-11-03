import { NUMBER_OF_FLOORS, ELEVATOR_SPEED } from '../config.js';


class FloorStats {

    constructor(id) {
        this.id = id;
        this.minTime = 99999;
        this.maxTime = 0;
        this.avgTime = 0;
        this.peopleThatLeft = 0;
        this.peopleCreated = 0;
        this.totalTime = 0;
    }

}

class Stats {

    constructor() {
        this.startTime = new Date(); 
        this.floorStats = [];
        for (let i = 0; i < NUMBER_OF_FLOORS; i++) {
            this.floorStats.push(new FloorStats(i + 1));
        }
        
    }

    updatePeopleCreated(floorId) {
        this.floorStats[floorId - 1].peopleCreated++;
    }

    updateTimeInSystem(person) {
        let now = new Date();
        let timeInSystem = now - person.creationTime;
        timeInSystem /= 1000;

        let floorStats = this.floorStats[person.floorId - 1];
        floorStats.peopleThatLeft++;
        if (floorStats.maxTime < timeInSystem) {
            floorStats.maxTime = timeInSystem;
        }
        if (floorStats.minTime > timeInSystem) {
            floorStats.minTime = timeInSystem;
        }
        floorStats.totalTime += timeInSystem;
        floorStats.avgTime = floorStats.totalTime / floorStats.peopleThatLeft;
    }

    _pad(width, string, padding) { 
        return (width <= string.length) ? string : this._pad(width, padding + string, padding)
    }

    log() {
        let now = new Date();
        let elapsedTime = now - this.startTime;
        elapsedTime /= 1000;
        let log = '  Elapsed time: ' + elapsedTime * ELEVATOR_SPEED + '\n';
        log += '\n';
        log += this._pad(10, 'Floor N°', ' ');
        log += this._pad(10, 'Avg time', ' ');
        log += this._pad(10, 'Min time', ' ');
        log += this._pad(10, 'Max time', ' ');
        log += this._pad(10, 'Ppl crtd', ' ');
        log += this._pad(10, 'Ppl left', ' ');
        log += '\n';
        log += '\n';
        this.floorStats.forEach(floor => {
            log += this._pad(10, floor.id, ' ');
            log += this._pad(10, parseFloat(floor.avgTime * ELEVATOR_SPEED).toFixed(2), ' ');
            log += this._pad(10, parseFloat(floor.minTime * ELEVATOR_SPEED).toFixed(2), ' ');
            log += this._pad(10, parseFloat(floor.maxTime * ELEVATOR_SPEED).toFixed(2), ' ');
            log += this._pad(10, floor.peopleCreated, ' ');
            log += this._pad(10, floor.peopleThatLeft, ' ');
            log += '\n';
        });
        return log;
    }

}

export var stats = new Stats();