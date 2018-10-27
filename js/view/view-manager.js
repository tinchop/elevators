import {Building} from './../model/building.js';
import * as config from './../config.js';

export class ViewManager {

    constructor(building, state) {
        this.building = building;
        this.state = state;
        this.views = [];
        this._initViews();
    }

    _initViews() {
        this.building.getElevators().forEach(this.createElevatorView, this);
        this.building.getFloors().forEach(this.createFloorView, this);
    }


    updateViews() {
        this.views.forEach(view => {
            view.x = view.modelObject.position.x;
            view.y = view.modelObject.position.y;
        });
        this.building.getFloors().forEach(floor => {
            floor.getPeopleWaiting().forEach(this.createPersonView, this);
        });

    }

    createElevatorView(elevator) {
        let elevatorView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures[ "elevatorSprite" ], 350, 0, true );
        elevatorView.modelObject = elevator;

        Kiwi.State.prototype.create.call( this.state );
    
        elevatorView.animation.add( "base", [ 0 ], 0.1, false );
    
        elevatorView.facing = "right";
        elevatorView.animation.play( "base" );
        this.state.addChild(elevatorView);
        this.views.push(elevatorView);
    }

    createPersonView(person) {
        if (person.justArrived) {
            person.justArrived = false;
            let spriteName = "personSprite" + (Math.floor(Math.random() * 8) + 1);
            let personView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures[ spriteName ], 350, 0, true );
            personView.modelObject = person;
    
            Kiwi.State.prototype.create.call( this.state );
        
            personView.animation.add( "base", [ 0 ], 0.1, false );
        
            personView.facing = "right";
            personView.animation.play( "base" );
            personView.x = person.position.x;
            personView.y = person.position.y;
            this.state.addChild(personView);
            this.views.push(personView);
        }
    }

    createFloorView(floor) {
        let floorView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures[ "floorSprite" ], 350, 0, true );
        floorView.modelObject = floor;

        Kiwi.State.prototype.create.call( this.state );
    
        floorView.animation.add( "base", [ 0 ], 0.1, false );
    
        floorView.facing = "right";
        floorView.animation.play( "base" );
        this.state.addChild(floorView);
        this.views.push(floorView);

        let labelX = floor.id == 10 ? 192 : 202;
        let floorLabel = new Kiwi.GameObjects.TextField(this.state, floor.id, labelX, floor.position.y + 8, "#000000"); 
        this.state.addChild(floorLabel);
    }

}