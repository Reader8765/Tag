const express = require("express");
const app = express();

// Stuff like HTML files
app.use("/", express.static(__dirname + "/client"))

// Stuff like JavaScript files
const bify = require("browserify-middleware");
app.use("/", bify(__dirname + "/client/js"));

const data = require("./load.js")();

const classes = require("./classes.js");
const entities = [];

// Setup the websocket server
const ws = require("ws");
const wss = new ws.Server({
	port: 3001,
});

const sid = require("shortid").generate;
const int = require("random-int");

function broadcast(wss, type, data) {
	const msg = JSON.stringify(Object.assign({
		type: type,
	}, data));

	wss.clients.forEach(client => {
		client.send(msg);
	});
}

wss.on("connection", socket => {
	const id = sid();
	entities.push(new classes.Player({
		id,
		x: int(1000),
		y: int(1000),
	}));

	broadcast(wss, "update", {
		entities: entities.map(entity => entity.getForClient()),
	});
});

// Ready to listen
app.listen(3000);