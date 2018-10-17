import Floor from './js/model/floor';

class Building {

    constructor(number_of_floors) {
        this.floors = [];
        for (let i = 0; i < number_of_floors; i++) {
            this.floors.push(new Floor(i));
        }

    }

}

module.exports = Building;