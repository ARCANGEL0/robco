// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey } from "../../util/io.js";
import friendRPG from './game.mjs';
import pause from "../../util/pause.js";
import say from "../../util/speak.js";



async function friend() {
  
  
	clear();
	say("Hi, elliot", 0.3, 0.8);
	await type('L o a d i n g. . . ');
	return new Promise(async resolve => {
		// LOGO
		clear()
		let logoScreen = await showTemplateScreen("logo");
		pause(2);

		await waitForKey();
		logoScreen.remove();


		// Main game screen
		let gameScreen = getScreen("friend");

		// Create the output for messages
		let output = document.createElement("div");
		output.classList.add("output");
		gameScreen.appendChild(output);

		addTemplate("console", gameScreen);
	
	/*
    // Set up the main game screen and output container
    const gameScreen = getScreen("console");
    const outputContainer = document.createElement("div");
    outputContainer.classList.add("output");
    gameScreen.appendChild(outputContainer);

  

    // Set up input handling
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.classList.add("terminal-input");

    inputField.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const input = inputField.value;
            inputField.value = ''; // Clear input field after submitting

            const output = friendRPG(input);
            displayOutput(output); // Display the result from friendRPG
        }
    });

    gameScreen.appendChild(inputField);
    inputField.focus();
    */
    
    
        await type("testing type")
            const inputField = document.createElement("input");

         inputField.type = "text";
    inputField.classList.add("terminal-input");

    inputField.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const input = inputField.value;
            inputField.value = ''; // Clear input field after submitting
  await type(input)
        }
    })
gameScreen.appendChild(inputField);
    inputField.focus();

    
	
	
	
	});
    

}


async function displayOutput(txt,output) {
  
		output.innerHTML = "";
				await type(txt, { initialWait: 0 }, output);
				await pause(2);
}

const templates = ["friend"];
export { templates };
export default friend;