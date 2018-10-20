import {Building} from './model/building.js';
import { ViewManager } from './view/view-manager.js';

const MAIN_STATE = "mainState";

var game = new Kiwi.Game();
var mainState = new Kiwi.State( MAIN_STATE );
var building = new Building();
var viewManager = new ViewManager(building);





mainState.elevators = [];
mainState.people = [];

mainState.preload = function() {

	Kiwi.State.prototype.preload.call(this);
	this.addSpriteSheet( "elevatorSprite", "images/elevator.png", 200, 50 );
	this.addSpriteSheet( "characterSprite", "images/character.png", 150, 117 );
	this.addImage( "background", "images/jungle.png" );

};


mainState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0, true );
	this.addChild(this.background);

	this.createPerson();
};

mainState.createPerson = function() {
	var character = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "characterSprite" ], 350, 0, true );

	Kiwi.State.prototype.create.call( this );

	character.animation.add(
		"idleright", [ 0 ], 0.1, false );
	character.animation.add(
		"crouchright", [ 1 ], 0.1, false );
	character.animation.add(
		"moveright", [ 2, 3, 4, 5, 6, 7 ], 0.1, true );
	character.animation.add(
		"idleleft", [ 8 ], 0.1, false );
	character.animation.add(
		"crouchleft", [ 9 ], 0.1, false );
	character.animation.add(
		"moveleft", [ 15, 14, 13, 12, 11, 10 ], 0.1, true );

	character.facing = "right";
	character.animation.play( "idleright" );
	this.addChild(character);
	this.people.push(character);
}

mainState.createElevatorView = function() {
	var elevatorView = new Kiwi.GameObjects.Sprite(this, this.textures[ "elevatorSprite" ], 350, 0, true );

	Kiwi.State.prototype.create.call( this );

	elevatorView.animation.add( "base", [ 0 ], 0.1, false );

	elevatorView.facing = "right";
	elevatorView.animation.play( "base" );
	this.addChild(elevatorView);
}


mainState.update = function() {

	Kiwi.State.prototype.update.call( this );

	building.update();
	for (var i = 0; i < this.people.length; i++) {
		var person = this.people[i];
		// console.log("people length: " + this.people.length);
		// console.log(person);
		if (person.y < 300) {
			person.y += 1;
		} else {
			this.people.splice(i, 1);
			person.destroy();
			this.createPerson();
		}
	}

};

game.states.addState(mainState);
game.states.switchState( MAIN_STATE );
