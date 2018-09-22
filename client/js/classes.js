
class Entity {
	constructor(x, y, direction) {
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
	
	render(ctx) {
		ctx.fillRect(this.x - 10, this.y - 10, 20, 20)
	}
}

class Player extends Entity {
	constructor(x, y, direction, tagged) {
		super(x, y, direction);

		this.tagged = tagged;
	}

	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);

		ctx.fillStyle = "black";
		ctx.fill();

		ctx.strokeStyle = "blue";
		ctx.stroke();
	}
}

module.exports = {
	Entity,
	Player,
};