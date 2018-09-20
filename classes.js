const { EventTarget } = require("yaeti");

class Entity extends EventTarget {
	constructor(data) {
		super();
		
		this.x = data.x;
		this.y = data.y;
		
		this.direction = 0;
		
		this.size = 5;
	}
	
	getForClient() {
		return [this.x, this.y];
	}
}

class PLayer extends Entity {
	constructor(data) {
		super(data);
		
		this.isSlow = false;
		
		this.isSprinting = false;
		this.boost = 1;
	}
	
	getSpeed() {
		const speedMultiplier = (this.isSprinting && this.boost) * 1.5;
		return (this.isSlow ? 2 : 5) * speedMultiplier;
	}

	launch() {}
}

module.exports = {
	object: Entity,
	player: Player,
	spike: class extends Entity {
		constructor(data) {
			super(data);
			
			this.size = 4;
			
			this.addEventListener("collide", event => {
				if (event.entity instanceof Player) {
					event.entity.launch(5, event.entity.direction - 180);
				}
			});
		}
	},
	trap: class extends Entity {
		constructor(data) {
			super(data);
			
			this.addEventListener("collide", event => {
				if (event.entity instanceof Player) {
					event.entity.isSlow = !!event.status;
				}
			});
		}
	},
};
