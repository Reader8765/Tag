class Entity {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
	}
	
	getForClient() {
		return [this.x, this.y];
	}
}

module.exports = {
	object: Entity,
	trap: Entity,
};
