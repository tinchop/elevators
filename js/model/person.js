export class Person {
    constructor(position, floorId, isInEfficientBuilding) {
        this.position = position;
        this.justArrived = true;
        this.leftBuilding = false;
        this.floorId = floorId;
        this.creationTime = new Date();
        this.isInEfficientBuilding = isInEfficientBuilding;
    }

    isInEfficientBuilding() {
        return this.isInEfficientBuilding;
    }
}