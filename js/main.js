import { Building } from './model/building.js';
import { ViewManager } from './view/view-manager.js';
import { ElevatorSystemManager } from './engine/elevator-system-manager.js';
import { InefficientElevatorSystemManager } from './engine/inefficient-elevator-system-manager.js';
import { USE_INEFFICIENT_MANAGER, LOG_COUNT } from './config.js';
import { stats } from './stats/stats.js';

const MAIN_STATE = "mainState";

let game = new Kiwi.Game();
let mainState = new Kiwi.State(MAIN_STATE);
let building = new Building();
let em;
if (USE_INEFFICIENT_MANAGER) {
	em = new InefficientElevatorSystemManager(building);
} else {
	em = new ElevatorSystemManager(building);
}
let viewManager;

mainState.preload = function () {

	Kiwi.State.prototype.preload.call(this);
	this.addSpriteSheet("elevatorSprite", "images/elevator.png", 100, 50);
	this.addSpriteSheet("floorSprite", "images/floor.png", 400, 50);
	for (let i = 1; i < 9; i++) {
		this.addSpriteSheet("personSprite" + i, "images/person" + i + ".png", 20, 32);
	}
	this.addImage("background", "images/background.png");

};


mainState.create = function () {

	Kiwi.State.prototype.create.call(this);

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures["background"], 0, 0, true);
	this.addChild(this.background);

	viewManager = new ViewManager(building, this);

};

let logCount = 0;

function downloadStats() {
	var atag = document.createElement("a");
	var file = new Blob(['lalalalala'], {type: 'text/plain'});
	atag.href = URL.createObjectURL(file);
	atag.download = 'stats.txt';
	atag.click();
}

mainState.update = function () {

	Kiwi.State.prototype.update.call(this);

	building.update();
	em.manage();
	viewManager.updateViews();
	logCount++;
	if (logCount == LOG_COUNT) {
		stats.log();
		logCount = 0;
	}

};

game.states.addState(mainState);
game.states.switchState(MAIN_STATE);
