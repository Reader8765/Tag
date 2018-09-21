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

class Player extends Entity {
	constructor(data) {
		super(data);
		
		this.isSlow = false;
		
		this.isSprinting = false;
		this.boost = 1;
		
		this.tagged = false;
		
		this.addEventListener("collide", event => {
			const collider = event.collidedWith;
			if (collider instanceof Player) {
				if (collider.tagged && !this.tagged) {
					this.tagged = true;
					collider.tagged = false;
				}
			}
		});
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
					event.collidedWith.launch(5, event.entity.direction - 180);
				}
			});
		}
	},
	trap: class extends Entity {
		constructor(data) {
			super(data);
			
			this.addEventListener("collide", event => {
				if (event.colledWith instanceof Player) {
					event.collidedWith.isSlow = !!event.status;
				}
			});
		}
	},
};
