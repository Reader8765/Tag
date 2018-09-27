// Requiring stuff
const classes = require("./classes.js");

window.socket = new WebSocket("ws://" + location.hostname + ":3001");

// Canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Handle size of canvas
function updateSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
updateSize();
window.addEventListener("resize", updateSize);

// Entities things
window.entities = [new classes.Entity(0, 0, 8)];

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	entities.forEach(entity => {
		entity.render(ctx);
	});

	requestAnimationFrame(render);
}
requestAnimationFrame(render);

socket.addEventListener("message", data => {
	const msg = JSON.parse(data.data);
	if (msg.type === "update") {
		entities = msg.entities.map(entity => {
			const entityClass = classes[entity[0]] || classes.Entity;
			return new entityClass(...entity.slice(1));
		});
	}
});