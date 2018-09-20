const fs = require("fs-extra");

async function loadJSON(path = "./game.json") {
	await fs.ensureFile(path);
	const game = await fs.loadJSON(path);
	
	return Object.assign({
		players: [],
	}, game);
}

