// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey } from "../../util/io.js";
import friendRPG from './game.mjs';

async function friend() {
    await type('L o a d i n g. . . ');

    clear();
    await showTemplateScreen("logo"); // Display the logo template
    await waitForKey(); // Wait for the player to press a key to continue

    clear();

    // Set up the main game screen and output container
    const gameScreen = getScreen("console");
    const outputContainer = document.createElement("div");
    outputContainer.classList.add("output");
    gameScreen.appendChild(outputContainer);

    addTemplate("layout", gameScreen);

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
}

function displayOutput(output) {
    const term = document.querySelector(".terminal .output");
    const el = document.createElement("pre");
    el.innerHTML = output;
    term.appendChild(el);
}

export default friend;
export { friend as templates };