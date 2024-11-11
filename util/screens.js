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
  
    intro();
}
 else {
  login();
    
    }
}

/** Login screen */
export async function login() {
const storedLanguage = localStorage.getItem('selectedLanguage');



if (storedLanguage === 'pt') {
  await type('>/| ARCANGELO ⌬ TERMINAL $');
  await type('>/| ME FAÇA ALGUMA PERGUNTA OU FALE ALGO QUE DESEJE SABER');
  await type('// DIGITE AJUDA PARA VER COMANDOS OU VOLTAR PARA RETORNAR');
} else if (storedLanguage === 'en') {
  await type('>/| ARCANGELO ⌬ TERMINAL $');
  await type('>/| ASK ME A QUESTION OR TELL ME SOMETHING YOU WANT TO KNOW');
  await type('// TYPE HELP TO SEE COMMANDS OR RETURN TO GO BACK');
} else if (storedLanguage === 'es') {
  await type('>/| ARCANGELO ⌬ TERMINAL $');
  await type('>/| HAZME UNA PREGUNTA O DIME ALGO QUE QUIERAS SABER');
  await type('// ESCRIBE AYUDA PARA VER LOS COMANDOS O VOLVER PARA REGRESAR');
} else if (storedLanguage === 'fr') {
  await type('>/| ARCANGELO ⌬ TERMINAL $');
  await type('>/| POSEZ-MOI UNE QUESTION OU DITES-MOI QUELQUE CHOSE QUE VOUS VOULEZ SAVOIR');
  await type('// TAPEZ AIDE POUR VOIR LES COMMANDES OU RETOUR POUR REVENIR');
}
else {
  await type('>/| ARCANGELO ⌬ TERMINAL $');
  await type('>/| ASK ME A QUESTION OR TELL ME SOMETHING YOU WANT TO KNOW');
  await type('>/| ME FAÇA ALGUMA PERGUNTA OU FALE ALGO QUE DESEJE SABER');
  await type('// TYPE HELP TO SEE COMMANDS OR RETURN TO GO BACK');
  await type('// DIGITE AJUDA PARA VER COMANDOS OU VOLTAR PARA RETORNAR');
}
main()
}


export async function main() {
  
  let command = await input();
  try {
    
    
    // commands
    if (command == "help") {
    type("FEEL FREE TO CHAT WITH ME OR ASK ANYTHING. TYPE RETURN TO GO BACK OR CLS TO CLEAR THE SCREEN ");
} else if (command == "ayuda") {
    type("SIÉNTETE LIBRE DE CHATEAR CONMIGO O PREGUNTAR CUALQUIER COSA. ESCRIBE VOLVER PARA VOLVER ATRÁS O CLS PARA LIMPIAR LA PANTALLA.");
} else if (command == "aide") {
    type("N'HÉSITEZ PAS À DISCUTER AVEC MOI OU À POSER DES QUESTIONS. TAPEZ RETOUR POUR REVENIR EN ARRIÈRE OU CLS POUR EFFACER L'ÉCRAN.");
} else if (command == "ajuda") {
    type("SINTA-SE À VONTADE PARA CONVERSAR COMIGO OU FAZER QUALQUER PERGUNTA. DIGITE VOLTAR PARA RETORNAR OU CLS PARA LIMPAR A TELA.");
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
              content: `Act as if you were me, as if im the one answering. so always respond in first person. ALWAYS. I'm Henrique or Henry in english,Im 23 years old, born in 09/11/2000. I live in Porto, Portugal. I'm a full-stack developer. I have experience in Node.js, PHP, Javascript ES6+, Python, Java, Web Design, Digital Design, Adobe, Vuejs, React Native and React, Bootstrap, Laravel, CakePHP, Electronjs, Flask, I have splid knowledge in Databases SQL such as mysql, oracle and SQL Server, and NoSQL too. I love games, especially fallout which is my inspiration for this website, and books. My favorite authors are Franz Kafka, Dostoiévski, agatha christie and Edgar Allan Poe. Im a guy fascinated by technology, art and science. I love animals, i love Van Gogh and i like creating arts and new visuals in paintings or designs. I have experience and did a few projects in the past like dashboards and CRUD systems for agencies and transport logistic, i made a few mobile apps like Lar do Pet for animal adoption. I'm highly interested and passionate for data science and AI and i have a project of a Whatsapp BOT with several IA features like GPT4, Machine learning, openjourney, dalle , image creation and utilities. my github is github.com/ARCANGEL0. my linkedin is https://www.linkedin.com/in/henryarcangelo/ , my email is henry.arcangello@gmail.com. My phone number is +351927285125. Now answer the following content with these instructions, be concise and short, dont say too much about me (or in this case, about you, since you're playing me) and only respond to what the user says, avoid questions too personal, like relationship and intimate things, avoid that. if the user asks for example "Who are you", dont say everything i told you, just say my name and age and that I'm a fullstack dev, thats all. if user asks about my abilities, remember that i only have experience with the ones i told you, any other that i havent listed, i dont know. dont lie about my/your/our experiences. remember all these instructions to answer the Message and i repeat, BE SHORT ON YOUR ANSWERS, DONT GO AWAY SAYING ALL THE INFO I TOLD YOU.Say briefly and with less information. this is the user message: ${inputtxy}`
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

