import {Building} from './model/building.js';
import { ViewManager } from './view/view-manager.js';

const MAIN_STATE = "mainState";

var game = new Kiwi.Game();
// game.cameras.defaultCamera.transform.scale = 0.9;
var mainState = new Kiwi.State( MAIN_STATE );
var building = new Building();
var viewManager;

mainState.preload = function() {

	Kiwi.State.prototype.preload.call(this);
	this.addSpriteSheet( "elevatorSprite", "images/elevator2.png", 100, 50 );
	this.addSpriteSheet( "floorSprite", "images/floor.png", 400, 50 );
	this.addImage( "background", "images/jungle.png" );

};


mainState.create = function(){

	Kiwi.State.prototype.create.call( this );

	this.background = new Kiwi.GameObjects.StaticImage(
		this, this.textures[ "background" ], 0, 0, true );
	this.addChild(this.background);

	viewManager = new ViewManager(building, this);

};


mainState.update = function() {

	Kiwi.State.prototype.update.call( this );

	building.update();
	viewManager.updateViews();

};

game.states.addState(mainState);
game.states.switchState( MAIN_STATE );
