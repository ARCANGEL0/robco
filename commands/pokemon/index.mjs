// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey,input, cleanInput,isPrintable,moveCaretToEnd  } from "../../util/io.js";

import pause from "../../util/pause.js";
import { typeSound } from "../../sound/index.js"
import say from "../../util/speak.js";




async function pokemon() {
  
  
	clear();
	say("BATTLE", 0.3, 0.8);
	await type('L o a d i n g. . . ');
	return new Promise(async resolve =>
	{
	  
	  let moves = {
    'tackle': {
        name: 'TACKLE',
        damage: 15,
        target: 'enemy'
    },
    'thundershock': {
        name: 'THUNDERSHOCK',
        damage: 25,
        target: 'enemy'
	},
	'scratch': {
		name: 'SCRATCH',
		damage: 4,
		target: 'enemy'
	},
	'ember': {
		name: 'EMBER',
		damage: 6,
		target: 'enemy'
	},
	'quick attack': {
		name: 'QUICK ATTACK',
		damage: 20,
		target: 'enemy'
	},
	'thunder': {
		name: 'THUNDER',
		damage: 40,
		target: 'enemy'
	},
	'fire blast': {
		name: 'FIRE BLAST',
		damage: 60,
		target: 'enemy'
	},
	'mega punch': {
		name: 'MEGA PUNCH',
		damage: 35,
		target: 'enemy'
	},
	'hydro pump': {
		name: 'HYDRO PUMP',
		damage: 60,
		target: 'enemy'
	},
	'skull bash': {
		name: 'SKULL BASH',
		damage: 35,
		target: 'enemy'
	},
	'acid': {
		name: 'ACID',
		damage: 28,
		target: 'enemy'
	},
	'belch': {
		name: 'BELCH',
		damage: 60,
		target: 'enemy'
	},
	'psychic': {
		name: 'PSYCHIC',
		damage: 40,
		target: 'enemy'
	},
	'rest': {
		name: 'REST',
		damage: -.6,
		target: 'self'
	},
	'solar beam': {
		name: 'SOLAR BEAM',
		damage: 60,
		target: 'enemy'
	},
	'body slam': {
		name: 'BODY SLAM',
		damage: 35,
		target: 'enemy'
	},
	'slash': {
		name: 'SLASH',
		damage: 35,
		target: 'enemy'
	},
	'hyper beam': {
		name: 'HYPERBEAM',
		damage: 70,
		target: 'enemy'
	},
	'hi jump kick': {
		name: 'HI JUMP KICK',
		damage: 50,
		target: 'enemy'
	},
	'mega kick': {
		name: 'MEGA KICK',
		damage: 60,
		target: 'enemy'
	},
	'lick': {
		name: 'LICK',
		damage: 35,
		target: 'enemy'
	},
	'low sweep': {
		name: 'LOW SWEEP',
		damage: 35,
		target: 'enemy'
	},
	'dynamic punch': {
		name: 'DYNAMIC PUNCH',
		damage: 50,
		target: 'enemy'
	}
};

var itemList = [];

let items = {
	'potion': {
		name: 'POTION',
		damage: -.3,
		target: 'self',
		amount: 3
	}
};

itemList.push(items);

function potion() {
	playerPokemon.useItem(playerPokemon, items['potion']);
	console.log('healed for ' + items.potion.damage);
}

class Pokemon {
	constructor(pokename, level, maxhealth, moves, imgfront, imgback) {
		this.pokename = pokename;
		this.level = level;
		this.health = maxhealth;
		this.maxhealth = maxhealth;
		this.moves = moves;
		this.imgfront = imgfront;
		this.imgback = imgback;
		this.alive = true;
	}

	decrementHealth(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			if (this.owner == 'player') {
				playerPokemon = this.faint(playerPokemon, playerParty);
			}
			if (this.owner == 'enemy') {
				enemyPokemon = this.faint(enemyPokemon, enemyParty);
			}
		}
		if (this.health > this.maxhealth) {
			this.health = this.maxhealth;
		}
	}
	attack(target, move) {
		if (move.target == 'self') {
			this.decrementHealth(Math.round(this.maxhealth * move.damage));
		} else {
		target.decrementHealth(move.damage);
		}
	}
	useItem(target, item) {
		if (item.target == 'self') {
			this.decrementHealth(this.maxhealth * item.damage);
		}
	}
	// Faint function will pull the next pokemon in the array into the battle
	faint(currentPokemon, party) {
		var foundPokemon = false;
		if (this.health <= 0) {
			console.log('fainted!');
			this.alive = false;
			for (var i = 0; i < party.length; i++) {
				if (party[i].alive == true) {
					foundPokemon = true;
					currentPokemon = party[i];
					console.log(currentPokemon.pokename)
					break;
				}
			}
			if (foundPokemon == false) {
				endGame();
			}
			return currentPokemon;
		}
	}
};

pokemon = [];
pokemon.push(new Pokemon('PIKACHU', 50, 117, [moves['tackle'], moves['thundershock']], './assets/img/pikachu.png', './assets/img/pikachuback.png'));
pokemon.push(new Pokemon('CHARIZARD', 50, 163, [moves['fire blast'], moves['mega punch']], './assets/img/charizard.png', './assets/img/charizardback.png'));
pokemon.push(new Pokemon('BLASTOISE', 50, 180, [moves['hydro pump'], moves['skull bash']], './assets/img/blastoise.png', './assets/img/blastoiseback.png'));
pokemon.push(new Pokemon('KADABRA', 50, 128, [moves['psychic'], moves['rest']], './assets/img/kadabra.png', './assets/img/kadabraback.png'));
pokemon.push(new Pokemon('VENUSAUR', 50, 171, [moves['solar beam'], moves['body slam']], './assets/img/venusaur.png', './assets/img/venusaurback.png'));
pokemon.push(new Pokemon('JOLTEON', 50, 152, [moves['quick attack'], moves['thunder']], './assets/img/jolteon.png', './assets/img/jolteonback.png'));
pokemon.push(new Pokemon('ARBOK', 50, 133, [moves['acid'], moves['belch']], './assets/img/arbok.png', './assets/img/arbokback.png'));
pokemon.push(new Pokemon('SCYTHER', 50, 155, [moves['slash'], moves['hyper beam']], './assets/img/scyther.png', './assets/img/scytherback.png'));
pokemon.push(new Pokemon('STARMIE', 50, 146, [moves['hydro pump'], moves['rest']], './assets/img/starmie.png', './assets/img/starmieback.png'));
pokemon.push(new Pokemon('HITMONLEE', 50, 138, [moves['hi jump kick'], moves['mega kick']], './assets/img/hitmonlee.png', './assets/img/hitmonleeback.png'));
pokemon.push(new Pokemon('HAUNTER', 50, 120, [moves['lick'], moves['psychic']], './assets/img/haunter.png', './assets/img/haunterback.png'));
pokemon.push(new Pokemon('MACHAMP', 50, 190, [moves['low sweep'], moves['dynamic punch']], './assets/img/machamp.png', './assets/img/machampback.png'));


let playerParty = [];
let enemyParty = [];

let titlesfx = new Audio('./assets/sfx/pokemonopening.mp3');
let battlesfx = new Audio('./assets/sfx/pokemonbattle.mp3');
let victorysfx = new Audio('./assets/sfx/pokemonvictory.mp3');

let playerPokemon;
let enemyPokemon;

addListeners();

function startButton() {
	document.getElementById('startbutton').style.zIndex = '-1';
	document.getElementById('battle').style.visibility = 'visible';
	document.getElementById('opening').style.zIndex = '1';
	titlesfx.play();
	setTimeout(function() {
		titlesfx.pause();
		transition();
	}, 9000);
}

function transition() {
	document.getElementById('black').src = './assets/img/black.png';
	document.getElementById('black').style.zIndex = '1';
	document.getElementById('opening').style.zIndex = '-1';
	setTimeout(function() {
	battlesfx.play();
	}, 1000);

	setTimeout(function() {
	document.getElementById('black').style.zIndex = '-1';
	initGame();
	}, 3800)
}

//Starts the game and sets the beginning pokemon at random
//Pokemon max of six for enemy and player
function initGame() {
	for (var i = 0; i < 6; i++) {
		var tempPokemon = pokemon.splice(Math.floor(Math.random() * pokemon.length), 1)[0];
		tempPokemon.owner = 'player';
		playerParty.push(tempPokemon);
		tempPokemon = pokemon.splice(Math.floor(Math.random() * pokemon.length), 1)[0];
		tempPokemon.owner = 'enemy';
		enemyParty.push(tempPokemon);
	}
	playerPokemon = playerParty[0];
	console.log(playerPokemon);
	enemyPokemon = enemyParty[0];

	showPokemon();
}

function showPokemon(){
	console.log(enemyPokemon);
	document.getElementById('pkmnback').src = playerPokemon.imgback;
	document.getElementById('pkmn').src = enemyPokemon.imgfront;
	document.getElementById('pkmnback-name').textContent = playerPokemon.pokename;
	document.getElementById('pkmn-name').textContent = enemyPokemon.pokename;
	document.getElementById('pkmnback-maxhp').textContent = playerPokemon.maxhealth;
	document.getElementById('pkmnback-hp').textContent = playerPokemon.health;
	document.getElementById('attack1').textContent = playerPokemon.moves[0].name;
	document.getElementById('attack2').textContent = playerPokemon.moves[1].name;

	// This animates the health bar when attacked
	var percentage = playerPokemon.health / playerPokemon.maxhealth;
	document.getElementById('player-hp-bar').style.width = ((161 * percentage) + "px");
	percentage = enemyPokemon.health / enemyPokemon.maxhealth;
	document.getElementById('enemy-hp-bar').style.width = ((161 * percentage) + "px");
}

function switchPokemon() {
	console.log('switched pokemon');
}

function itemButton() {

}

function fightButton() {
	document.getElementById('b2').src = "./assets/img/pkmnbattle2.png";
	document.getElementById('attackcancel').style.zIndex = '1';
	document.getElementById('attack1').style.zIndex = '1';
	document.getElementById('attack2').style.zIndex = '1';
}

function pkmnButton() {

}

function cancelButton() {
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";

}

function attack1() {
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[0]);
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";
	if (playerPokemon.moves[0].target != 'self') {
		document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
		setTimeout(function() {
			document.getElementById('pkmn').style.animation = '';
		}, 1000);
	}
	enemyPokemon.faint(enemyPokemon, enemyParty);
	removeListeners();
	setTimeout(function() {
		enemyAttack();
		addListeners();
	}, 1000);

	showPokemon();
}

function attack2() {
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[1]);
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";
	if (playerPokemon.moves[1].target != 'self') {
		document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
		setTimeout(function() {
			document.getElementById('pkmn').style.animation = '';
		}, 1000);
	}
	console.log(enemyPokemon.health);
	enemyPokemon.faint(enemyPokemon, enemyParty);
	removeListeners();
	setTimeout(function () {
		enemyAttack();
		addListeners();
	}, 1000);
	showPokemon();
}

function enemyAttack() {
	var attackMove = Math.floor(Math.random() * enemyPokemon.moves.length);
	console.log('attacked with',enemyPokemon.moves[attackMove].name);
	enemyPokemon.attack(playerPokemon,enemyPokemon.moves[attackMove]);
	if (enemyPokemon.moves[attackMove].target != 'self') {
		document.getElementById('pkmnback').style.animation = 'blink 0.15s 5';
		setTimeout(function() {
			document.getElementById('pkmnback').style.animation = '';
		}, 1000);
	}
	showPokemon();
	playerPokemon.faint(playerPokemon, playerParty);
}

function addListeners() {
	document.getElementById('startbutton').addEventListener('click', startButton);
	document.getElementById('fight').addEventListener('click', fightButton);
	document.getElementById('attackcancel').addEventListener('click', cancelButton);
	document.getElementById('attack1').addEventListener('click', attack1);
	document.getElementById('attack2').addEventListener('click', attack2);
	// document.getElementById('items').addEventListener('click', potion);
}

function removeListeners() {
	document.getElementById('fight').removeEventListener('click', fightButton);
	document.getElementById('attackcancel').removeEventListener('click', cancelButton);
	document.getElementById('attack1').removeEventListener('click', attack1);
	document.getElementById('attack2').removeEventListener('click', attack2);
	// document.getElementById('items').removeEventListener('click', potion);
}

function endGame() {
	document.getElementById('ending').src = './assets/img/pkmnvictory.png';
	document.getElementById('ending').style.zIndex = '1';
	document.getElementById('endingtext').style.zIndex = '1';
	battlesfx.pause();
	victorysfx.play();
}



	  // game
	});
    

}



const stylesheets = ["pokemon"];
const templates = ["pokemon"];
export { templates,stylesheets };
export default pokemon;