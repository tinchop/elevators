import { USE_INEFFICIENT_MANAGER } from './config.js';
import { ElevatorSystemManager } from './engine/elevator-system-manager.js';
import { InefficientElevatorSystemManager } from './engine/inefficient-elevator-system-manager.js';
import { Building } from './model/building.js';
import { stats } from './stats/stats.js';
import { ViewManager } from './view/view-manager.js';

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
		atag.download = USE_INEFFICIENT_MANAGER ? 'inefficient_stats_' + now.getTime() + '.txt' : 'stats_' + now.getTime() + '.txt';
		atag.click();
		downloadStart = new Date();
	}

}

mainState.update = function () {

	Kiwi.State.prototype.update.call(this);

	building.update();
	em.manage();
	viewManager.updateViews();

	if ( this.downloadKey.isDown ) {
		downloadStats();
    }

};

game.states.addState(mainState);
game.states.switchState(MAIN_STATE);
