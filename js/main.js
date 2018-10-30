import { Building } from './model/building.js';
import { ViewManager } from './view/view-manager.js';
import { ElevatorSystemManager } from './engine/elevator-system-manager.js';

const MAIN_STATE = "mainState";

let game = new Kiwi.Game();
let mainState = new Kiwi.State(MAIN_STATE);
let building = new Building();
let esm = new ElevatorSystemManager(building);
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


mainState.update = function () {

	Kiwi.State.prototype.update.call(this);

	building.update();
	esm.manage();
	viewManager.updateViews();

};

game.states.addState(mainState);
game.states.switchState(MAIN_STATE);
