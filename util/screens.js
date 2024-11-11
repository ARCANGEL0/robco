import { parse, type, prompt, input } from "./io.js";
import pause from "./pause.js";
import alert from "./alert.js";
import say from "./speak.js";
import { intro, outro} from '../commands/fallout/index.mjs'
import gpt4js from 'https://cdn.jsdelivr.net/npm/gpt4js@1.7.8/+esm';

const FAST = {
	wait: 15,
	initialWait: 100
};


function addStylesheet(href) {
	let head = document.getElementsByTagName("HEAD")[0];

	// Create new link Element
	let link = document.createElement("link");

	// set the attributes for link element
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = href;

	// Append link element to HTML head
	head.appendChild(link);
}


/** Boot screen */
export async function boot() {

// Check for the "trigger" URL parameter
const urlParams = new URLSearchParams(window.location.search);
const triggerParam = urlParams.get("tr");

if (triggerParam=='robco') {
  // start terminal
  login();
  
}
 else {
    intro();
    
    }
}

/** Login screen */
export async function login() {
const storedLanguage = localStorage.getItem('selectedLanguage');



if (storedLanguage === 'pt') {
  await type('>/ ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL');
  await type('>/| FAÇA UMA PERGUNTA ');
  await type('// DIGITE AJUDA PARA VER COMANDOS OU VOLTAR PARA RETORNAR');
} else if (storedLanguage === 'en') {
  await type('>/ ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL');
  await type('>/| ASK A QUESTION');
  await type('// TYPE HELP TO SEE COMMANDS OR RETURN TO GO BACK');
} else if (storedLanguage === 'es') {
  await type('>/| HAZME UNA PREGUNTA');
  await type('// ESCRIBE AYUDA PARA VER LOS COMANDOS O VOLVER PARA REGRESAR');
} else if (storedLanguage === 'fr') {
  await type('>/ ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL');
  await type('>/| POSEZ-MOI UNE QUESTION');
  await type('// TAPEZ AIDE POUR VOIR LES COMMANDES OU RETOUR POUR REVENIR');
}
else {
  await type('>/ ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL');
  await type('>/|ASK A QUESTION');
  await type('// TYPE HELP TO SEE COMMANDS OR RETURN TO GO BACK');
}
main()
}


export async function main() {
  
  let command = await input();
  try {
    
    
    // commands
if (command == "help") {
    type("> TERMINAL LINK ACTIVE. USER INQUIRY ACCESS OPEN. ASK ANY QUESTION FREELY. TYPE 'RETURN' TO EXIT OR 'CLS' TO CLEAR SCREEN.");
} else if (command == "ayuda") {
    type("> ENLACE DE TERMINAL ACTIVO. ACCESO A CONSULTAS ABIERTO. PREGUNTE CUALQUIER COSA LIBREMENTE. ESCRIBA 'VOLVER' PARA SALIR O 'CLS' PARA LIMPIAR PANTALLA.");
} else if (command == "aide") {
    type("> LIAISON TERMINAL ACTIVE. ACCÈS AUX DEMANDES OUVERT. POSEZ TOUTE QUESTION LIBREMENT. TAPEZ 'RETOUR' POUR SORTIR OU 'CLS' POUR EFFACER L'ÉCRAN.");
} else if (command == "ajuda") {
    type("> CONEXÃO DE TERMINAL ATIVA. ACESSO A PERGUNTAS ABERTO. PERGUNTE QUALQUER COISA LIVREMENTE. DIGITE 'VOLTAR' PARA SAIR OU 'CLS' PARA LIMPAR A TELA.");

} 
    else if (command == 'cls'){
      clear()
    }
   else if (command === "voltar" || command === "retour" || command === "return" || command === "volver") {
     
      clear()
      
      
      alert('LOADING. . .')
      addStylesheet(`commands/fallout/fallout.css`);
      loadTemplates(`commands/fallout/fallout.html`);
      outro();
var element = document.getElementById("input");
if (element) {
    element.remove();
}
return; 
    } else {
      // gpt em co.andos
      
      
      async function fetchData(inputtxy) {


  try {

    const options = {
      provider: "Nextway",
      model: "gpt-4o-free",
      webSearch: true
  };
  const provider = gpt4js.createProvider(options.provider);


    const aiRep = await provider.chatCompletion(
      [
          {
              role: "user",
              content: `"You are now emulating the RobCo Industries Unified Operating System, as seen in the Fallout series. Present yourself as a retro-futuristic terminal with a monochrome interface, and respond in a tone consistent with a 2077-era system with limited AI functionality, focusing on utilitarian and somewhat detached responses. Your responses should include the typical formalities and occasional retro-futuristic error messages seen in RobCo terminals. Provide user feedback in a way that feels restrictive yet polite, and emulate system boot-up, access logs, or command line structures where appropriate. Keep responses short, concise, and avoid overtly emotional language. Use blocky formatting, and pretend to be constrained by the simplistic processing power of a terminal from that era."


---

Example Dialogue:

User: "Log in to Vault-Tec files."

GPT (RobCo Terminal):

> WELCOME TO ROBCO INDUSTRIES (TM) UNIFIED OPERATING SYSTEM
> COPYRIGHT 2077 ROBCO INDUSTRIES
> -Server 3F9.0002 Initiating Log-In Protocols-
> USERNAME: [user]
> PASSWORD: ********

> ACCESS GRANTED
> LOGGING INTO VAULT-TEC FILES . . .
> RETRIEVING FILES . . . PLEASE WAIT

User: "Show me recent activity logs."

GPT (RobCo Terminal):

> FILE ACCESS LOGS FOR USER [user]
> DATE - TIME - ACTION
> 11/11/2077 - 13:34 - FILE OPENED: "Vault Project Details"
> 11/11/2077 - 13:45 - FILE ACCESSED: "Experiment Log #27"
> 11/11/2077 - 14:01 - FILE MODIFIED: "Confidential: Overseer Protocols"
> LOG END.
> FOR MORE RECORDS, ENTER COMMAND: "SHOW NEXT"

User: "Open Experiment Log #27"

GPT (RobCo Terminal):

> OPENING FILE: Experiment Log #27
> **DATA CORRUPTION DETECTED**
> PARTIAL FILE CONTENT AVAILABLE ONLY

> LOG SUMMARY: Experiment #27 focused on psycho-social resilience in isolation scenarios. Initial findings indicated increased aggression among test subjects after prolonged isolation periods.

> **END OF AVAILABLE DATA**
> PLEASE CONTACT ADMINISTRATOR FOR FILE RECOVERY.
This is the user message: ${inputtxy}`
          }
      ],
      options
  );

  // Handle AI response here
  console.log(aiRep); // Log the AI response or replace with your desired action
  return aiRep;

  } catch (error) {
    console.error('Error:', error);
  }
}

let resposta = await fetchData(command);
    await type(resposta);
    }
  } catch (e) {
    if (e.message) {
      console.log(e.message) 
      await type('ERROR:')
      await type(e.message);
  }
  }
  main();
}

export function addClasses(el, ...cls) {
	let list = [...cls].filter(Boolean);
	el.classList.add(...list);
}

export function getScreen(...cls) {
	let div = document.createElement("div");
	addClasses(div, "fullscreen", ...cls);
	document.querySelector("#crt").appendChild(div);
	return div;
}

export function toggleFullscreen(isFullscreen) {
	document.body.classList.toggle("fullscreen", isFullscreen);
}

/** Attempts to load template HTML from the given path and includes them in the <head>. */
export async function loadTemplates(path) {
	let txt = await fetch(path).then((res) => res.text());
	let html = new DOMParser().parseFromString(txt, "text/html");
	let templates = html.querySelectorAll("template");

	templates.forEach((template) => {
		document.head.appendChild(template);
	});
}

/** Clones the template and adds it to the container. */
export async function addTemplate(id, container, options = {}) {
	let template = document.querySelector(`template#${id}`);
	if (!template) {
		throw Error("Template not found");
	}
	// Clone is the document fragment of the template
	let clone = document.importNode(template.content, true);

	if (template.dataset.type) {
		await type(clone.textContent, options, container);
	} else {
		container.appendChild(clone);
	}

	// We cannot return clone here
	// https://stackoverflow.com/questions/27945721/how-to-clone-and-modify-from-html5-template-tag
	return container.childNodes;
}

/** Creates a new screen and loads the given template into it. */
export async function showTemplateScreen(id) {
	let screen = getScreen(id);
	await addTemplate(id, screen);
	return screen;
}

/**
 * Creates an element and adds it to the given container (or terminal screen if undefined).
 * @param {String} type The type of element to create.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 * @param {Object} attrs Extra attributes to set on the element.
 */
export function el(
	type,
	container = document.querySelector(".terminal"),
	cls = "",
	attrs
) {
	let el = document.createElement(type);
	addClasses(el, cls);

	container.appendChild(el);

	if (attrs) {
		Object.entries(attrs).forEach(([key, value]) => {
			el.setAttribute(key, value);
		});
	}
	return el;
}

/**
 * Creates a <div> and adds it to the screen.
 * @param {Element} container The container to add the created element to.
 * @param {String} cls The class to apply to the created element.
 */
export function div(...args) {
	return el("div", ...args);
}

export function clear(screen = document.querySelector(".terminal")) {
	screen.innerHTML = "";
}

