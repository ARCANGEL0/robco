const ROT = window.ROT;

const messages = {
    en: {
        emptyBox: [
            "This box is empty, wastelander :-(",
            "No loot here!",
            "Nada, keep searching!",
            "Bogus find!",
            "Keep looking for supplies!"
        ],
        playerMessage: "Find the Nuka-Cola, Bro!",
        winMessage: "A winner is you! You found the Nuka-Cola!",
        nothingHere: "Nothing here, keep searching...",
        deathMessage: "Oh no, you were caught by a mutant!",
        quitMessage: "You have left the wasteland."
    },
    pt: {
        emptyBox: [
            "Esta caixa está vazia, viajante :-(",
            "Nada aqui!",
            "Nada, continue procurando!",
            "Achado sem valor!",
            "Continue procurando suprimentos!"
        ],
        playerMessage: "Encontre a Nuka-Cola, mano!",
        winMessage: "Você é um vencedor! Encontrou a Nuka-Cola!",
        nothingHere: "Nada aqui, continue procurando...",
        deathMessage: "Oh não, você foi pego por um mutante!",
        quitMessage: "Você deixou o deserto."
    },
    fr: {
        emptyBox: [
            "Cette boîte est vide, aventurier :-(",
            "Pas de butin ici!",
            "Rien, continuez à chercher!",
            "Trouvaille sans valeur!",
            "Continuez à chercher des fournitures!"
        ],
        playerMessage: "Trouvez la Nuka-Cola, mon pote!",
        winMessage: "Un gagnant, c'est vous! Vous avez trouvé la Nuka-Cola!",
        nothingHere: "Rien ici, continuez à chercher...",
        deathMessage: "Oh non, vous avez été attrapé par un mutant!",
        quitMessage: "Vous avez quitté le désert."
    },
    es: {
        emptyBox: [
            "Esta caja está vacía, viajero :-(",
            "¡No hay botín aquí!",
            "Nada, ¡sigue buscando!",
            "¡Encuentro sin valor!",
            "¡Sigue buscando suministros!"
        ],
        playerMessage: "¡Encuentra la Nuka-Cola, amigo!",
        winMessage: "¡Eres un ganador! ¡Encontraste la Nuka-Cola!",
        nothingHere: "Nada aquí, sigue buscando...",
        deathMessage: "¡Oh no, te atrapó un mutante!",
        quitMessage: "Has dejado el yermo."
    }
};

const nope = (lang) => {
    const answers = messages[lang].emptyBox;
    return answers[Math.floor(Math.random() * answers.length)];
};

/*
 * Maps the event keyCode to Rot direction.
 * The directions are clockwise, starting at the top:
 *
 * +------------+
 * | 7 | 0 | 1 |
 * +------------+
 * | 6 | . | 2 |
 * +------------+
 * | 5 | 4 | 3 |
 * +------------+
 */

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

class Player {
    _x = null;
    _y = null;
    _game = null;

    constructor(game, x, y) {
        this._x = x;
        this._y = y;
        this.game = game;

        this.game.message(messages[this.game.lang].playerMessage);

        document
            .querySelector(".up")
            .addEventListener("click", () => this.move(0, -1));
        document
            .querySelector(".right")
            .addEventListener("click", () => this.move(1, 0));
        document
            .querySelector(".left")
            .addEventListener("click", () => this.move(-1, 0));
        document
            .querySelector(".down")
            .addEventListener("click", () => this.move(0, 1));

        document
            .querySelector(".mid")
            .addEventListener("click", () => this._checkBox());
    }

    act() {
        this.game.engine.lock();
        window.addEventListener("keydown", this.handleEvent);
    }

    get key() {
        return this._x + "," + this._y;
    get coords() {
        return [this._x, this._y];
    }

    handleEvent = event => {
        let code = event.keyCode;
        if (code === 32) {
            // Space
            this._checkBox();
            return;
        } else if (code === 81 || code === 27) {
            // Q or ESC
            this.game.quit();
            return;
        }

        if (!(code in keyMap)) {
            return;
        }

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

        if (!(newKey in this.game.map)) {
            return;
        }
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

            await this.game.alert(messages[this.game.lang].winMessage);
            this.game.quit();
        } else if (this.game.map[key] === BOX) {
            this.game.message(nope(this.game.lang));
            this.game.map[key] = EMPTY_BOX;
        } else {
            this.game.message(messages[this.game.lang].nothingHere);
        }
    }
}

class Pedro {
    constructor(game, x, y) {
        this.game = game;
        this._x = x;
        this._y = y;
    }

    get coords() {
        return [this._x, this._y];
    }

    async act() {
        let [x, y] = this.game.player.coords;

        let passableCallback = (x, y) => {
            return x + "," + y in this.game.map;
        };
        let astar = new ROT.Path.AStar(x, y, passableCallback, { topology: 4 });

        let path = [];
        let pathCallback = function(x, y) {
            path.push([x, y]);
        };
        astar.compute(this._x, this._y, pathCallback);

        path.shift(); 
        if (path.length === 1) {
            this.game.engine.lock();
            await this.game.alert(messages[this.game.lang].deathMessage);
            this.game.quit();
        } else if (Math.random() > 0.5) {
            x = path[0][0];
            y = path[0][1];
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
    pedro = null;
    ananas = null;

    mapWidth = 100;
    mapHeight = 100;

    constructor(settings = {}) {
        this.settings = settings;
        this.lang = settings.lang || 'en';

        this.display = new ROT.Display({
            fontFamily: "VT323",
            ...settings
        });

        this._generateMap();

        let scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.pedro, true);
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
        this.pedro = this._createDuder(Pedro, freeCells);
        this._drawWholeMap();
    }

    _drawWholeMap() {
        let { width, height } = this.settings;

        let [cx, cy] = this.player.coords;
        let topLeftX = Math.max(0, cx - width / 2);
        topLeftX = Math.min(topLeftX, this.mapWidth - width);

        let topLeftY = Math.max(0, cy - height / 2);
        topLeftY = Math.min(topLeftY, this.mapHeight - height);

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

        this.display.draw(cx - topLeftX, cy - topLeftY, "B", "yellow");

        let [px, py] = this.pedro.coords;
        this.display.draw(px - topLeftX, py - topLeftY, "P", "red");
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