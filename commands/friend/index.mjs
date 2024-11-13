
import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey } from "../../util/io.js";
import say from "../../util/speak.js";
import alert from "../../util/alert.js";
import pause from "../../util/pause.js";

import Game from './game.mjs';


async function friend() {
   await type('L o a d i n g. . . ');
  
		pause(3);
  
  
	clear();
	say("eXit", 0.5, 0.8);
	return new Promise(async resolve => {
		// LOGO
		let logoScreen = await showTemplateScreen("logo");
		pause(2);

		await waitForKey();
		logoScreen.remove();


		// Main game screen
		let gameScreen = getScreen("console");

		// Create the output for messages
		let output = document.createElement("div");
		output.classList.add("output");
		gameScreen.appendChild(output);

		addTemplate("layout", gameScreen);
		
		let body = getComputedStyle(document.body);
	
	
	/////game logic to receive input and show outputs
	});
}

const templates = ["friend"];

export default friend;
export { templates };
