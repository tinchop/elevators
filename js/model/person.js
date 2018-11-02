export class Person {
    constructor(position, floorId) {
        this.position = position;
        this.justArrived = true;
        this.leftBuilding = false;
        this.floorId = floorId;
        this.creationTime = new Date();
    }
}