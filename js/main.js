import { ElevatorSystemManager } from './engine/elevator-system-manager.js';
import { PeopleGenerator } from './engine/people-generator.js';
import { InefficientElevatorSystemManager } from './engine/inefficient-elevator-system-manager.js';
import { Building } from './model/building.js';
import { stats } from './stats/stats.js';
import { ViewManager } from './view/view-manager.js';
import { PEOPLE_SPRITES_COUNT } from './config.js';

const MAIN_STATE = "mainState";
let options = {width : 850};
let game = new Kiwi.Game("", "Elevators", null, options);
let mainState = new Kiwi.State(MAIN_STATE);
let inefficientBuilding = new Building(false);
let efficientBuilding = new Building(true);
let inefficientEm = new InefficientElevatorSystemManager(inefficientBuilding);
let efficientEm = new ElevatorSystemManager(efficientBuilding);
let peopleGenerator = new PeopleGenerator(efficientBuilding, inefficientBuilding);
let viewManager;

mainState.preload = function () {

	Kiwi.State.prototype.preload.call(this);
	this.addSpriteSheet("elevatorSprite", "images/elevator.png", 75, 50);
	this.addSpriteSheet("floorSprite", "images/floor.png", 200, 50);
	for (let i = 1; i <= PEOPLE_SPRITES_COUNT; i++) {
		this.addSpriteSheet("personSprite" + i, "images/person" + i + ".png", 20, 32);
	}
	this.addImage("background", "images/background.png");

};


mainState.create = function () {

	Kiwi.State.prototype.create.call(this);

	this.inefficientBuildingBackground = new Kiwi.GameObjects.StaticImage(
		this, this.textures["background"], 0, 0, true);
	this.addChild(this.inefficientBuildingBackground);

	this.efficientBuildingBackground = new Kiwi.GameObjects.StaticImage(
		this, this.textures["background"], 425, 0, true);
	this.addChild(this.efficientBuildingBackground);

	viewManager = new ViewManager(inefficientBuilding, efficientBuilding, this);

	this.downloadKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );

};

let downloadStart = new Date();

function downloadStats() {

	let now = new Date();
	let elapsedTime = now - downloadStart;
	elapsedTime /= 1000;
	if (elapsedTime > 1) {
		var atag = document.createElement("a");
		var file = new Blob([stats.log()], {type: 'text/plain'});
		atag.href = URL.createObjectURL(file);
		atag.download = 'stats_' + now.getTime() + '.txt';
		atag.click();
		downloadStart = new Date();
	}

}

mainState.update = function () {

	Kiwi.State.prototype.update.call(this);

	peopleGenerator.createPerson();
	inefficientEm.manage();
	efficientEm.manage();
	viewManager.updateViews();

	if ( this.downloadKey.isDown ) {
		downloadStats();
    }

};

game.states.addState(mainState);
game.states.switchState(MAIN_STATE);
