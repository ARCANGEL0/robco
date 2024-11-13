// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey } from "../../util/io.js";
import friendRPG from './game.mjs';
import pause from "../../util/pause.js";

async function friend() {
    await type('L o a d i n g. . . ');

    clear();
let gameScreen = getScreen("friend");

		// Create the output for messages
		let output = document.createElement("div");
		output.classList.add("output");
	addTemplate("console", gameScreen);
		
		let body = getComputedStyle(document.body);

  
    await showTemplateScreen("logo"); // Display the logo template
    await waitForKey(); // Wait for the player to press a key to continue

    clear();
/*
    // Set up the main game screen and output container
    const gameScreen = getScreen("console");
    const outputContainer = document.createElement("div");
    outputContainer.classList.add("output");
    gameScreen.appendChild(outputContainer);

    

    // Display initial game text
    displayOutput(friendRPG(""));

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
    
    displayOutput("testing")
}


async function displayOutput(output) {
  
		output.innerHTML = "";
				await type(output, { initialWait: 0 }, output);
				await pause(2);
}

const templates = ["friend"];
export { templates };
export default friend;