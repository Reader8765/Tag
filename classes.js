class Object {
	constructor(data) {
		this.x = data.x;
		this.y = data.y;
	}
	
	getForClient() {
		return [this.x, this.y];
	}
}

module.exports = {
	object: Object,
	trap: Object,
};
