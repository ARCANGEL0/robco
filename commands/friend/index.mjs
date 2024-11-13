// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey,input, cleanInput,isPrintable } from "../../util/io.js";
import friendRPG from './game.mjs';
import pause from "../../util/pause.js";
import { typeSound } from "../../sound/index.js"
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
        output.style.padding = "8vh 2vw"; // Setting the padding
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
    
    const terminal = document.querySelector(".output");
const input = document.createElement("span");
input.setAttribute("id", "input");
input.setAttribute("contenteditable", true);
terminal.appendChild(input);

        
          
    await type('teste')
        let reply = await getReply();
        clear()
        reply.remove()
        await type('pergunta 2')
        let reply2 = await getReply();
        reply2.remove()
        clear()
        await type('pergunta 3')
        let reply3 = await getReply();
        reply3.remove()

	
	});
    

}

/*
async function getReply(pw) {
	return new Promise((resolve) => {
		// This handles all user input
		const onKeyDown = (event) => {
			typeSound();
			// ENTER
			if (event.keyCode === 13) {
				event.preventDefault();
				event.target.setAttribute(
					"contenteditable",
					false
				);
				let result = cleanInput(
					event.target.textContent
				);

				resolve(result);
			}
			
			// BACKSPACE
			else if (event.keyCode === 8) {
				// Prevent inserting a <br> when removing the last character
				if (event.target.textContent.length === 1) {
					event.preventDefault();
					event.target.innerHTML = "";
				}
			}
			// Check if character can be shown as output (skip if CTRL is pressed)
			else if (isPrintable(event.keyCode) && !event.ctrlKey) {
				event.preventDefault();
				// Wrap the character in a span
				let span = document.createElement("span");

				let keyCode = event.keyCode;
				let chrCode =
					keyCode - 48 * Math.floor(keyCode / 48);
				let chr = String.fromCharCode(
					96 <= keyCode ? chrCode : keyCode
				);
				// Add span to the input
				span.classList.add("char");
				span.textContent = chr;
				event.target.appendChild(span);

				// For password field, fill the data-pw attr with asterisks
				// which will be shown using CSS
				if (pw) {
					let length =
						event.target.textContent.length;
					event.target.setAttribute(
						"data-pw",
						Array(length).fill("*").join("")
					);
				}
				moveCaretToEnd(event.target);
			}
		};

		// Add input to terminal
		let terminal = document.querySelector(".output");
		let input = document.createElement("span");
		input.setAttribute("id", "input");
		
		input.setAttribute("contenteditable", true);
		input.addEventListener("keydown", onKeyDown);
		terminal.appendChild(input);
		input.focus();
	});
}
    */
async function getReply(pw) {
    return new Promise((resolve) => {
        const onKeyDown = (event) => {
            typeSound();
            // ENTER
            if (event.keyCode === 13) {
                event.preventDefault();
                let result = cleanInput(event.target.textContent);
                resolve(result);
                
                // Clear the input after resolving
                event.target.textContent = ""; // Clear the input
             
                moveCaretToEnd(event.target); // Move caret to the end
            }
            
            // BACKSPACE
            else if (event.keyCode === 8) {
                // Prevent inserting a <br> when removing the last character
                if (event.target.textContent.length === 1) {
                    event.preventDefault();
                    event.target.textContent = ""; // Clear the input
                }
            }
            // Check if character can be shown as output (skip if CTRL is pressed)
            else if (isPrintable(event.keyCode) && !event.ctrlKey) {
                event.preventDefault();
                // Get the character corresponding to the keyCode
                let keyCode = event.keyCode;
                let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
                let chr = String.fromCharCode(96 <= keyCode ? chrCode : keyCode);
                
                // Append the character directly to the input
                event.target.textContent += chr;

                // For password field, fill the data-pw attr with asterisks
                // which will be shown using CSS
        
                moveCaretToEnd(event.target);
            }
        };

        // Clear previous input before setting the focus
        input.textContent = ""; // Clear the input field
        input.addEventListener("keydown", onKeyDown);
        input.focus();
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