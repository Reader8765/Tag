const easel = require("@createjs/easeljs");

class Entity extends easel.Graphics.Circle {
	constructor(x, y, dir) {
		super(x, y);
	}
}
