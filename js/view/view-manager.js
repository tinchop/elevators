import { PEOPLE_SPRITES_COUNT } from '../config.js';

export class ViewManager {

    constructor(inefficientBuilding, efficientBuilding, state) {
        this.inefficientBuilding = inefficientBuilding;
        this.efficientBuilding = efficientBuilding;
        this.state = state;
        this.views = [];
        this._initViews();
    }

    _initViews() {
        this.inefficientBuilding.elevators.forEach(this.createElevatorView, this);
        this.inefficientBuilding.floors.forEach(this.createFloorView, this);
        this.efficientBuilding.elevators.forEach(this.createElevatorView, this);
        this.efficientBuilding.floors.forEach(this.createFloorView, this);
    }


    updateViews() {
        this.views.forEach(view => {
            view.x = view.modelObject.position.x;
            view.y = view.modelObject.position.y;
        });
        this.views = this.views.filter(view => view.modelObject.position.x >= 0);
        this.inefficientBuilding.floors.forEach(floor => {
            floor.peopleWaiting.forEach(this.createPersonView, this);
        });
        this.inefficientBuilding.floors.forEach(floor => {
            floor.peopleWaiting.forEach(this.createPersonView, this);
        });
        this.efficientBuilding.floors.forEach(floor => {
            floor.peopleWaiting.forEach(this.createPersonView, this);
        });
        this.efficientBuilding.floors.forEach(floor => {
            floor.peopleWaiting.forEach(this.createPersonView, this);
        });

    }

    createElevatorView(elevator) {
        let elevatorView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures["elevatorSprite"], 350, 0, true);
        elevatorView.modelObject = elevator;

        Kiwi.State.prototype.create.call(this.state);

        elevatorView.animation.add("base", [0], 0.1, false);

        elevatorView.facing = "right";
        elevatorView.animation.play("base");
        this.state.addChild(elevatorView);
        this.views.push(elevatorView);
    }

    createPersonView(person) {
        if (person.justArrived) {
            person.justArrived = false;
            let spriteName = "personSprite" + (Math.floor(Math.random() * PEOPLE_SPRITES_COUNT) + 1);
            let personView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures[spriteName], 350, 0, true);
            personView.modelObject = person;

            Kiwi.State.prototype.create.call(this.state);

            personView.animation.add("base", [0], 0.1, false);

            personView.facing = "right";
            personView.animation.play("base");
            personView.x = person.position.x;
            personView.y = person.position.y;
            this.state.addChild(personView);
            this.views.push(personView);
        }
    }

    createFloorView(floor) {
        if (floor.id != 0) {
            let floorView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures["floorSprite"], 350, 0, true);
            floorView.modelObject = floor;

            Kiwi.State.prototype.create.call(this.state);

            floorView.animation.add("base", [0], 0.1, false);

            floorView.facing = "right";
            floorView.animation.play("base");
            this.state.addChild(floorView);
            this.views.push(floorView);

            let labelX = floor.isInEfficientBuilding ? 450 : 25;
            let floorLabel = new Kiwi.GameObjects.TextField(this.state, floor.id, labelX, floor.position.y + 6, "#000000");
            this.state.addChild(floorLabel);
        }
    }

}