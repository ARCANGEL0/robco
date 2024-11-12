import alert from "../../util/alert.js";
import { getScreen, clear, div, el } from "../../util/screens.js";
import Game from './game.mjs';

function dino() {
	clear();

	return new Promise(resolve => {
		let gameScreen = getScreen("dino");
		let container = div(gameScreen, 'dino-container');
		const storedLanguage = localStorage.getItem('selectedLanguage')
		let headerTitle;

		if (storedLanguage === 'pt') {
			headerTitle = 'VOCÊ MORREU! ☠️ \n Pontuação: ';
		} else if (storedLanguage === 'en') {
			headerTitle = 'YOU DIED! ☠️ \n Score: ';
		} else if (storedLanguage === 'fr') {
			headerTitle = 'VOUS ÊTES MORT! ☠️ \n Score: ';
		} else if (storedLanguage === 'es') {
			headerTitle = '¡HAS MUERTO! ☠️ \n Puntuación: ';
		} else {
			headerTitle = 'YOU DIED! ☠️ \n Score: ';
		}
        

		const onGameOver = async (score) => {
			await alert(`${headerTitle} ${score}`)
			resolve();
		};
		
		let game = new Game({ container, onGameOver });
		game.start();
	});

}

const stylesheets = ['dino'];

export { stylesheets };

export default dino;