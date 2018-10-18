import {Building} from './model/building.js';

const ELEVATORS_STATE = "elevatorsState";

const NUMBER_OF_FLOORS = 10;

var building = new Building(NUMBER_OF_FLOORS);


var myGame = new Kiwi.Game();

var elevatorsState = new Kiwi.State( ELEVATORS_STATE );

elevatorsState.elevators = [];
elevatorsState.people = [];

elevatorsState.preload = function() {

	Kiwi.State.prototype.preload.call(this);

	this.addSpriteSheet( "characterSprite", "images/character.png", 150, 117 );
	this.addImage( "background", "images/jungle.png" );

};


elevatorsState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0, true );
	this.addChild(this.background);

	this.createPerson();
};

elevatorsState.createPerson = function() {
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

elevatorsState.createElevator = function() {
	var character = new Kiwi.GameObjects.Sprite(
		this, this.textures[ "characterSprite" ], 350, 0, true );

	Kiwi.State.prototype.create.call( this );

	character.animation.add(
		"idleright", [ 0 ], 0.1, false );

	character.facing = "right";
	character.animation.play( "idleright" );
	this.addChild(character);
	this.people.push(character);
}


elevatorsState.update = function() {

	Kiwi.State.prototype.update.call( this );

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

myGame.states.addState(elevatorsState);
myGame.states.switchState( ELEVATORS_STATE );
