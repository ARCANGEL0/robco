// friend.mjs

import { getScreen, showTemplateScreen, addTemplate, clear } from "../../util/screens.js";
import { type, waitForKey,input, cleanInput,isPrintable,moveCaretToEnd  } from "../../util/io.js";
import alert from "../../util/alert.js";

import pause from "../../util/pause.js";
import { typeSound } from "../../sound/index.js"
import say from "../../util/speak.js";

const output = [
    ">>> ERROR: DATA CORRUPTION DETECTED [0x80070057]",
    ">>> REBOOTING... [0xC000021A]",
    ">>> SYSTEM MALFUNCTION: REPAIR REQUIRED [0x0000001E]",
    ">>> LOG: TRACE IN PROGRESS [0xC0000409]",

];
let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
   
const texts = {
    es: { title1: "Acceso a la Red", title2: "Recopilar Datos", title3: "Simulación de Salida", desc1: "Infiltra el sistema para obtener acceso a la red.", desc2: "Recopila datos críticos de los registros del sistema.", desc3: "Ejecuta la simulación de salida para salir del sistema." },
    fr: { title1: "Accès au Réseau", title2: "Collecter des Données", title3: "Simulation de Sortie", desc1: "Infiltrez le système pour obtenir un accès au réseau.", desc2: "Collectez des données critiques à partir des journaux du système.", desc3: "Exécutez la simulation de sortie pour quitter le système." },
    pt: { title1: "Acesso à Rede", title2: "Coletar Dados", title3: "Simulação de Saída", desc1: "Infiltre o sistema para obter acesso à rede.", desc2: "Coleta dados críticos dos registros do sistema.", desc3: "Execute a simulação de saída para sair do sistema." },
    en: { title1: "Network Access", title2: "Data Retrieval", title3: "Exit Simulation", desc1: "Infiltrate the system to gain access to the network.", desc2: "Retrieve critical data from the system logs.", desc3: "Execute exit simulation to safely disengage from the system." }
  };

const { title1, title2, title3, desc1, desc2, desc3 } = texts[selectedLanguage];

// Game states
const state = {
    selectedRow: 0,
    selectedColumn: null,
    bufferSlots: [],
    gameStarted: false,
    gameOver: false,
    timer: 75.50 * 1000,
}

let timerState = {
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
}
let gameScreen
const sequences = [
    "55 BD",
    "BD BD",
    "BD E9"
];

async function breach() {
    
    clear();
	say("BREACH DETECTED", 0.5, 0.8);
	return new Promise(async resolve => {
  let output 
    async function reboot() {

       document.querySelector('.center').classList.add('glitch')
       const glitchContainer = document.querySelector('.glitch');
Array.from({ length: 5 }).forEach(() => 
  glitchContainer.prepend(Object.assign(document.createElement('div'), { className: 'glitch__item' }))
);
        console.log('Wrong decision. . . . . . . ');
        await pause(30);
        alert('YOU HAVE BEEN FLAGGED');
        await pause(50);
        await waitForKey();
        
        // Start the game again 
        gameScreen.remove()
        await start();
    }
    async function escape() {
    
        pause(10)
        clear()
        exitHeader.remove()
        await type(gameData[selectedLanguage].win1); 
        pause(30)
        clear()
        await type(gameData[selectedLanguage].win2); 
        pause(35)
        clear()
        gameScreen.remove()
        resolve()
    }
       
    
function initGame() {
    highlightItems();
    document.querySelectorAll('.item').forEach(elem => {elem.addEventListener('click', selectItem)})
}

function highlightItems() {
    const rowOrColumn = state.selectedRow !== null ? 'row' : 'column';
    const rowOrColumnNumber = state.selectedRow !== null ? state.selectedRow : state.selectedColumn;
    const selectedRow = document.querySelectorAll(`.${rowOrColumn}-${rowOrColumnNumber}`);
    selectedRow.forEach(elem => {
        if (elem.className.includes('inactive')) {
            return;
        }
        elem.classList.add('active');
    });
}

function resetHighlight() {
    const rowOrColumn = state.selectedRow !== null ? 'row' : 'column';
    const rowOrColumnNumber = state.selectedRow !== null ? state.selectedRow : state.selectedColumn;
    const selectedRow = document.querySelectorAll(`.${rowOrColumn}-${rowOrColumnNumber}`);
    selectedRow.forEach(elem => {
        elem.classList.remove('active');
    });
}

function checkAllSequencesDone() {
    // Check if all sequences are marked as done
    return sequences.every(sequence => sequence === "XXXX");
}

function selectItem(e) {
    if (state.gameOver) {
        return;
    }
    if (!e.target.className.includes('active')) {
        return;
    }
    if (!state.gameStarted) {
        startGame();
    }
    if (state.bufferSlots.length < 5) {
        state.bufferSlots.push(e.target.innerText);
        updateBufferSlots();
    }
    if (state.selectedColumn === null) {
        resetHighlight();
        state.selectedRow = null;
        const columnNumber = Array.from(e.target.classList).find(item => item.includes('column')).split('-')[1];
        state.selectedColumn = columnNumber;
        highlightItems();
    } else {
        resetHighlight();
        state.selectedColumn = null;
        const rowNumber = Array.from(e.target.classList).find(item => item.includes('row')).split('-')[1];
        state.selectedRow = rowNumber;
        highlightItems();
    }
    e.target.classList.add('inactive');
    checkSequences();
    if (state.bufferSlots.length === 5) {
        state.gameStarted = false;
        state.gameOver = true;
        resetHighlight();

        if (checkAllSequencesDone()) {
            escape()
        } else {
            reboot();
        }

        return;
    }
}

function updateBufferSlots() {
    state.bufferSlots.forEach((buffer, index) => {
        document.getElementById('buffer-box-' + index).innerText = buffer;
    })
}

function checkSequences() {
    const joinedBuffers = state.bufferSlots.join(' ');
    const index = sequences.findIndex(sequence => joinedBuffers.includes(sequence))
    if (index > -1) {
        sequences[index] = "XXXX";
        document.getElementById('sequence-' + index).classList.add('done');
    };
}

function startGame() {
    state.gameStarted = true;
    timerState = {
        startTime: new Date().getTime(),
        lastTime: new Date().getTime(),
    }
    requestAnimationFrame(timer);
}

function timer() {
    if (state.gameStarted) {
        const now = new Date().getTime();
        state.timer -= now - timerState.lastTime;
        const displayTimer = (state.timer / 1000).toFixed(2);
        if (state.timer <= 0) {
            state.timer = 0;            
            resetHighlight();
            state.gameOver = true;
            state.gameStarted = false;
            reboot()
        }
        if (state.timer > 0) {
            requestAnimationFrame(timer);
        }
        document.getElementById('breach-timer-value').innerHTML = displayTimer;
        timerState.lastTime = now;
    }
}

function initMatrix() {
  

    ["sequence-0", "sequence-1", "sequence-2"].forEach((id, index) => {
      const seq = document.getElementById(id);
      seq.querySelector(".title").textContent = eval(`title${index + 1}`);
      seq.querySelector(".description").textContent = eval(`desc${index + 1}`);
    });
    const matrixElement = document.getElementById('matrix');

    const values = ['E9', '7A', 'BD', '55', '1C'];

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        row.classList.add("row")
        for (let k = 0; k < 6; k++) {
            const item = document.createElement('td');
            item.innerText = values[Math.floor(Math.random() * values.length)];
            item.classList.add('item');
            item.classList.add('row-' + i.toString());
            item.classList.add('column-' + k.toString());
            row.appendChild(item);
        }
        matrixElement.appendChild(row);
    }
}

// Closure for game start
async function start() {
    console.log('breaching')
    gameScreen = getScreen("breach");
    await addTemplate('hack', gameScreen);
            output = document.createElement("div");
            output.classList.add("output");
         
            gameScreen.appendChild(output);

            
    initMatrix();
    initGame();
}


       await start()

        
    
       
    })

}



const templates = ["breach"];
const stylesheets = ["breach"];


export { output, templates , stylesheets};
export default breach;