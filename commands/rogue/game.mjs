const ROT = window.ROT;

const keyMap = {
	38: 0,
	33: 1,
	39: 2,
	34: 3,
	40: 4,
	35: 5,
	37: 6,
	36: 7
};

const WALL = "▦";
const CLEAR = " ";
const BOX = "▣";
const EMPTY_BOX = "□";

// Retrieve the selected language from localStorage
const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

// Multilingual messages for the game
const messages = {
	en: {
		nope: [
			"The box is empty.",
			"Nothing found here.",
			"This box holds no items.",
			"No supplies in this box.",
			"Keep searching for supplies."
		],
		start: ">>> RobCo Simulation Active: Wasteland Survival Mode\n>>> Locate supplies and secure the exit before encountering hostiles.",
		objective: ">>> Objective: Search boxes for Stimpaks and Radaways to stay prepared.",
		warning: ">>> WARNING: Hostiles detected nearby. Proceed with caution.",
		quit: ">>> Exiting RobCo Simulation...",
		winner: ">>> Simulation Success: Mission accomplished.",
		empty: ">>> No items found here.",
		foundBox: ">>> Box located. Check for supplies.",
		death: ">>> Simulation Ended: Hostile encounter resulted in failure.",
		checkBox: ">>> Checking box for supplies...",
		controls: ">>> Controls:\n[ARROWS] - Move\n[SPACE] - Check box\n[Q/ESC] - Quit"
	},
	es: {
		nope: [
			"La caja está vacía.",
			"No se encontró nada aquí.",
			"Esta caja no contiene objetos.",
			"No hay suministros en esta caja.",
			"Sigue buscando suministros."
		],
		start: ">>> Simulación RobCo Activa: Modo de Supervivencia en el Yermo\n>>> Busca suministros y alcanza la salida antes de los hostiles.",
		objective: ">>> Objetivo: Busca en las cajas Stimpaks y Radaways para mantenerte preparado.",
		warning: ">>> ADVERTENCIA: Hostiles detectados cerca. Procede con precaución.",
		quit: ">>> Saliendo de la Simulación RobCo...",
		winner: ">>> Éxito en la Simulación: Misión cumplida.",
		empty: ">>> No se encontraron objetos aquí.",
		foundBox: ">>> Caja localizada. Verifica los suministros.",
		death: ">>> Fin de Simulación: Encuentro hostil resultó en fallo.",
		checkBox: ">>> Revisando caja en busca de suministros...",
		controls: ">>> Controles:\n[FLECHAS] - Mover\n[ESPACIO] - Revisar caja\n[Q/ESC] - Salir"
	},
	fr: {
		nope: [
			"La boîte est vide.",
			"Rien trouvé ici.",
			"Cette boîte ne contient aucun objet.",
			"Pas de fournitures dans cette boîte.",
			"Continuez à chercher des fournitures."
		],
		start: ">>> Simulation RobCo Active : Mode de Survie en Wasteland\n>>> Trouvez des fournitures et rejoignez la sortie avant les hostiles.",
		objective: ">>> Objectif : Fouillez les caisses pour des Stimpaks et Radaways pour rester prêt.",
		warning: ">>> AVERTISSEMENT : Hostiles détectés à proximité. Progressez avec prudence.",
		quit: ">>> Quitter la Simulation RobCo...",
		winner: ">>> Succès de la Simulation : Mission accomplie.",
		empty: ">>> Aucun objet trouvé ici.",
		foundBox: ">>> Boîte localisée. Vérifiez les fournitures.",
		death: ">>> Fin de la Simulation : Échec suite à une rencontre hostile.",
		checkBox: ">>> Vérification de la boîte pour des fournitures...",
		controls: ">>> Contrôles:\n[FLÈCHES] - Déplacer\n[ESPACE] - Vérifier la boîte\n[Q/ÉCHAP] - Quitter"
	},
	pt: {
		nope: [
			"A caixa está vazia.",
			"Nada encontrado aqui.",
			"Esta caixa não contém itens.",
			"Não há suprimentos nesta caixa.",
			"Continue procurando por suprimentos."
		],
		start: ">>> Simulação RobCo Ativa: Modo de Sobrevivência no Deserto\n>>> Encontre suprimentos e chegue à saída antes dos hostis.",
		objective: ">>> Objetivo: Procure nas caixas por Stimpaks e Radaways para se manter preparado.",
		warning: ">>> AVISO: Hostis detectados nas proximidades. Prossiga com cautela.",
		quit: ">>> Saindo da Simulação RobCo...",
		winner: ">>> Sucesso na Simulação: Missão cumprida.",
		empty: ">>> Nenhum item encontrado aqui.",
		foundBox: ">>> Caixa localizada. Verifique os suprimentos.",
		death: ">>> Fim da Simulação: Falha devido a encontro hostil.",
		checkBox: ">>> Verificando caixa em busca de suprimentos...",
		controls: ">>> Controles:\n[SETAS] - Mover\n[ESPAÇO] - Verificar caixa\n[Q/ESC] - Sair"
	}
};

// Function to retrieve the correct language-based message
const getMessage = (key) => messages[selectedLanguage][key];

// Load player and mutant images
const playerImage = new Image();
playerImage.src = './images/assets/rogueBoy.png';

const mutantImage = new Image();
mutantImage.src = './images/assets/mutant.png';

const nope = () => {
	let answers = getMessage("nope");
	return answers[Math.floor(Math.random() * answers.length)];
};

class Player {
	_x = null;
	_y = null;
	_game = null;

	constructor(game, x, y) {
		this._x = x;
		this._y = y;
		this.game = game;

		this.game.message(getMessage("start"));

		document.querySelector(".up").addEventListener("click", () => this.move(0, -1));
		document.querySelector(".right").addEventListener("click", () => this.move(1, 0));
		document.querySelector(".left").addEventListener("click", () => this.move(-1, 0));
		document.querySelector(".down").addEventListener("click", () => this.move(0, 1));
		document.querySelector(".mid").addEventListener("click", () => this._checkBox());
	}

	act() {
		this.game.engine.lock();
		window.addEventListener("keydown", this.handleEvent);
	}

	handleEvent = event => {
		let code = event.keyCode;
		if (code === 32) {
			this._checkBox();
			return;
		} else if (code === 81 || code === 27) {
			this.game.quit();
			return;
		}

		if (!(code in keyMap)) return;
		event.preventDefault();
		window.removeEventListener("keydown", this.handleEvent);

		let [dx, dy] = ROT.DIRS[8][keyMap[code]];
		this.move(dx, dy);

		this.game.engine.unlock();
	};

	move(dx, dy) {
		let newX = this._x + dx;
		let newY = this._y + dy;
		let newKey = newX + "," + newY;

		if (!(newKey in this.game.map)) return;
		this._x = newX;
		this._y = newY;
		this.game._drawWholeMap();
		this.game.updateControls();
	}

	async _checkBox() {
		let key = this.key;

		if (key === this.game.ananas) {
			this.game.engine.lock();
			window.removeEventListener("keydown", this.handleEvent);

			await this.game.alert(getMessage("winner"));
			this.game.quit();
		} else if (this.game.map[key] === BOX) {
			this.game.message(nope());
			this.game.map[key] = EMPTY_BOX;
		} else {
			this.game.message(getMessage("empty"));
		}
	}
}

class Mutant {
	constructor(game, x, y) {
		this.game = game;
		this._x = x;
		this._y = y;
	}

	async act() {
		let [x, y] = this.game.player.coords;
		let passableCallback = (x, y) => x + "," + y in this.game.map;
		let astar = new ROT.Path.AStar(x, y, passableCallback, { topology: 4 });

		let path = [];
		let pathCallback = function(x, y) {
			path.push([x, y]);
		};
		astar.compute(this._x, this._y, pathCallback);

		path.shift();
		if (path.length === 1) {
			this.game.engine.lock();
			await this.game.alert(getMessage("death"));
			this.game.quit();
		} else if (Math.random() > 0.5) {
			[x, y] = path[0];
			this._x = x;
			this._y = y;
		}
	}
}

class Game {
	map = {};
	walls = {};
	display = null;
	player = null;
	mutant = null;
	ananas = null;

	constructor(settings = {}) {
		this.settings = settings;
		this.display = new ROT.Display({ fontFamily: "VT323", ...settings });
		this._generateMap();

		let scheduler = new ROT.Scheduler.Simple();
		scheduler.add(this.player, true);
		scheduler.add(this.mutant, true);
		this.engine = new ROT.Engine(scheduler);
		this.engine.start();

		let canvas = this.display.getContainer();
		canvas.classList.add("game");
		settings.container.appendChild(canvas);
		this.updateControls();
	}

	async message(text) {
		return await this.settings.onMessage(text);
	}

	async alert(text) {
		return await this.settings.onAlert(text);
	}

	quit() {
		this.settings.onQuit();
	}

	isWall(x, y) {
		return this.walls[x + "," + y] === WALL;
	}

	updateControls() {
		let [px, py] = this.player.coords;

		document
			.querySelector(".up")
			.toggleAttribute("disabled", this.isWall(px, py - 1));
		document
			.querySelector(".down")
			.toggleAttribute("disabled", this.isWall(px, py + 1));
		document
			.querySelector(".left")
			.toggleAttribute("disabled", this.isWall(px - 1, py));
		document
			.querySelector(".right")
			.toggleAttribute("disabled", this.isWall(px + 1, py));
	}

	_generateMap() {
		let digger = new ROT.Map.Digger();
		let freeCells = [];

		let digCallback = (x, y, isWall) => {
			let key = x + "," + y;
			if (isWall) {
				this.walls[key] = WALL;
			} else {
				freeCells.push(key);
				this.map[key] = CLEAR;
			}
		};
		digger.create(digCallback.bind(this));

		this._generateBoxes(freeCells);
		this.player = this._createDuder(Player, freeCells);
		this.mutant = this._createDuder(Mutant, freeCells);
		this._drawWholeMap();
	}

	_drawWholeMap() {
		let { width, height } = this.settings;

		let [cx, cy] = this.player.coords;
		let topLeftX = Math.max(0, cx - width / 2);
		topLeftX = Math.min(topLeftX, this.mapWidth - width);
		let topLeftY = Math.max(0, cy - height / 2);
		topLeftY = Math.min(topLeftY, this.mapHeight - height);

		let cellWidth = this.display._options.fontSize;
		let cellHeight = this.display._options.fontSize;

		for (let x = topLeftX; x < topLeftX + width; x++) {
			for (let y = topLeftY; y < topLeftY + height; y++) {
				let char = this.map[x + "," + y];
				this.display.draw(x - topLeftX, y - topLeftY, char);

				let wall = this.walls[x + "," + y];
				if (wall) {
					this.display.draw(
						x - topLeftX,
						y - topLeftY,
						wall,
						this.settings.wall
					);
				}
			}
		}

		// Draw player image
		this.display.getContainer().getContext('2d').drawImage(
			playerImage,
			(cx - topLeftX) * cellWidth,
			(cy - topLeftY) * cellHeight,
			cellWidth,
			cellHeight
		);

		// Draw mutant image
		let [mx, my] = this.mutant.coords;
		this.display.getContainer().getContext('2d').drawImage(
			mutantImage,
			(mx - topLeftX) * cellWidth,
			(my - topLeftY) * cellHeight,
			cellWidth,
			cellHeight
		);
	}

	_generateBoxes(freeCells) {
		for (let i = 0; i < 10; i++) {
			let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
			let key = freeCells.splice(index, 1)[0];
			this.map[key] = BOX;

			if (i === 0) {
				this.ananas = key;
			}
		}
	}

	_createDuder(duder, freeCells) {
		let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
		let key = freeCells.splice(index, 1)[0];
		let [x, y] = key.split(",").map(c => parseInt(c));
		return new duder(this, x, y);
	}
}

export default Game;