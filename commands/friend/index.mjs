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
    
    
        displayOutput("test display", gameScreen)
          

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.classList.add("terminal-input");
        
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
        
        const arrow = document.createElement("span");
        arrow.classList.add("arrow");
        arrow.textContent = ">";
        
        const blinkingCursor = document.createElement("span");
        blinkingCursor.classList.add("blinking-cursor");
        blinkingCursor.textContent = "_";
        
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(arrow);
        inputContainer.appendChild(blinkingCursor);
        document.body.appendChild(inputContainer);
        
        const style = document.createElement("style");
        style.textContent = `
            .terminal-input {
                padding: 10px 5px;
                background-color: transparent;
                border: none;
                color: #333;
                outline: none;
                font-size: 16px;
                position: relative;
            }
            .input-container {
                display: inline-flex;
                align-items: center;
            }
            .arrow {
                font-size: 20px;
                color: #4CAF50;
                margin-left: 5px;
            }
            .blinking-cursor {
                font-size: 20px;
                color: #4CAF50;
                margin-left: 5px;
                animation: blink 1s step-start infinite;
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

    inputField.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const input = inputField.value;
            inputField.value = ''; // Clear input field after submitting
            displayOutput(input, gameScreen)
          
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