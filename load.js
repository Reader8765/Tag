const fs = require("fs-extra");

async function loadJSON(path = "./game.json") {
	await fs.ensureFile(path);
	const game = await fs.readJSON(path).catch(() => {
    		fs.writeJSON(path, {});
  	});

	return Object.assign({
		players: [],
	}, game);
}

module.exports = loadJSON;