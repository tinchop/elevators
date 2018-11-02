import { NUMBER_OF_FLOORS } from '../config.js';


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

    log() {
        let now = new Date();
        let elapsedTime = now - this.startTime;
        elapsedTime /= 1000;
        let log = 'Elapsed time: ' + elapsedTime + '\n';
        this.floorStats.forEach(floor => {
            log += 'Floor: ' + floor.id + ', ';
            log += 'Avg time: ' + floor.avgTime + ', ';
            log += 'Min time: ' + floor.minTime + ', ';
            log += 'Max time: ' + floor.maxTime + ', ';
            log += 'People created: ' + floor.peopleCreated + ', ';
            log += 'People that left: ' + floor.peopleThatLeft + '\n';
        });
        return log;
    }

}

export var stats = new Stats();