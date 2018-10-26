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
        this.views.forEach(function (view) {
            view.x = view.modelObject.position.x;
            view.y = view.modelObject.position.y;
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

    createFloorView(floor) {
        let floorView = new Kiwi.GameObjects.Sprite(this.state, this.state.textures[ "floorSprite" ], 350, 0, true );
        floorView.modelObject = floor;

        Kiwi.State.prototype.create.call( this.state );
    
        floorView.animation.add( "base", [ 0 ], 0.1, false );
    
        floorView.facing = "right";
        floorView.animation.play( "base" );
        this.state.addChild(floorView);
        this.views.push(floorView);
    }

}