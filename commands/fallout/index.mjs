// Inspiration:
// - https://youtu.be/jDJHtLCHuAg
// - http://aramor.epizy.com/fallout-terminal/password?diff=1
import { getScreen, clear, main,boot,login} from "../../util/screens.js";
import {parse, type } from "../../util/io.js";
import Game from './Game.mjs';
import pause from "../../util/pause.js";

// Fast config for the typer
const FAST = {
	wait: 15,
	initialWait: 100
};

// The main function, shows intro screen and the game screen
async function command() {
	clear();
	
	let win = await new Promise(resolve => {
		new Game({onQuit: resolve});
	});

	if (win) {
		await outro();
	} else {
		return await locked();
	}	
	
	return Promise.resolve();
}

export async function intro() {
	let intro = getScreen("intro");

	await type("Welcome to ROBCO Industries (TM) Termlink Interface", FAST, intro);

	await type(">SET TERMINAL/INQUIRE", {}, intro);

	await type("RIT-V300", FAST, intro);

	await type(
		[
			">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F",
			">SET HALT logout/MAINT"
		],
		{ newlineWait: 200 },
		intro
	);

	await type(
		[ 
		  " ",
			"Initializing ROBCO Industries(TM) MF Boot Agent v2.3.0",
			"RETROS BIOS",
			"RBIOS-4.02.08.00 52EE5.E7.E8",
			`Copyright ${new Date().getFullYear()} ARCANGELO.net.`,
			"Uppermem: 64 KB",
			"Root (5A8)",
			"Maintenance Mode"
		],
		FAST,
		intro
	);

	await type(">RUN DEBUG/ACCOUNTS.F", { finalWait: 1000 }, intro);

	intro.remove();
	
	await parse("fallout")
}
 async function locked() {
	let locked = getScreen("locked");

	await type(
		["Terminal locked", " ", "Please contact an administrator"],
		{ useContainer: false },
		locked
	);

	await pause(50000);
	locked.remove();

	return Promise.resolve();
}

// Outro shows screen with buttons to logout (calls game()) or exit
export async function outro() {
	let outro = getScreen("outro");
function generateDynamicLine(char = "━") {
    // Get the width of the screen in pixels
    const screenWidth = window.innerWidth;

    // Approximate width of the character in pixels (adjust based on your font size)
    const charWidth = 8; // Adjust if your font is different
    const charCount = Math.floor(screenWidth / charWidth) -12;

    // Create a line with the specified character
    return char.repeat(charCount);
}



	await new Promise(async resolve => {
		


await type(
    [
        "       ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
        `                 COPYRIGHT ${new Date().getFullYear()} ARCANGELO `,
        `                        -SERVER 6- `,
        generateDynamicLine("━")  // This will produce a full-width line
    ],
    FAST,
    outro
);

function calculateAge(birthdate) {
  let today = new Date();
  let birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

const birthdate = '2000-11-09'; // Replace with your birthdate in 'YYYY-MM-DD' format
const age = calculateAge(birthdate);
let btnhome, btnsobre, btngal, btncontact, btnlang, btnreturn, sitext,sobretexto,hometexto,contactinfo, bbnsite, bbnvid
function updateTexts() {
		  inicio.innerText = btnhome
		  sobre.innerText = btnsobre
		  galeria.innerText = btngal
		  contato.innerText = btncontact
		  idioma.innerText= btnlang
		  
		}
// Function to handle language change
function changeLanguage(language) {
  
  
  if (language === 'pt') {
     contactinfo = "Informações de Contato:\n\n ";
 btnhome = '[INICIO]';
 btnsobre = '[SOBRE]';
 btngal = '[GALERIA]';
 btncontact = '[CONTATO]';
 btnlang = '[LANGUAGE/LANGUE]';
 btnreturn = '[VOLTAR]';
 sitext = 'WEBSITES QUE FIZ';
 bbnsite = '[WEBSITES]';
 bbnvid = "[GALERIA]";
 sobretexto = [
  `\n>// Fala aí! Eu sou o Henry – desenvolvedor, gamer e criador digital, apaixonado por tecnologia que desafia limites (e minha paciência, às vezes).`,
  `Escrevo códigos que *geralmente* funcionam, crio interfaces bem boladas, e desenvolvo apps pra deixar a web mais interessante. Meus pronomes? TCP/IP.`,
  `Mando bem com JavaScript, Vue, React, Python, PHP, Node, e várias outras ferramentas que uso pra tirar ideias do papel. Front-end, back-end, banco de dados – se envolve código, eu tô dentro.`,
  `Atualmente, tô mergulhando em Cibersegurança e Ciência de Dados, aprendendo a hackear *eticamente* e a deixar o mundo digital um pouco mais seguro. Então, se você busca alguém que construa, quebre e (quase sempre) conserte, sou o cara certo.`
];
 hometexto = "> ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\n> ACCESSING LOGS #27...\n\n--- LOG ENTRY INITIALIZED ---\n\nBem-vindo ao meu portfólio, inspirado no icônico Termlink da ROBCO Industries da série Fallout.\n\nSou  Henry, desenvolvedor backend movido por uma paixão por software, redes e tudo relacionado à TI. Aqui, você encontrará uma amostra dos meus projetos, e meus links de contacto :) .\n\n> SYSTEM STATUS: ALL SYSTEMS NORMAL\n\n--- PRESSIONE QUALQUER TECLA PARA CONTINUAR ---";
  } else if (language === 'es') {
    // Add translations in Spanish here
    
     contactinfo = "Información de contacto:\n\n";
 btnhome = '[INICIO]';
 btnsobre = '[ACERCA DE]';
 btngal = '[GALERÍA]';
 btncontact = '[CONTACTO]';
 btnlang = '[IDIOMA/LANGUAGE]';
 btnreturn = '[VOLVER]';
 sitext = 'SITIOS WEB QUE HE CREADO';
bbnsite = '[SITIOS WEB]';
 bbnvid = "[GALERIA]"
 sobretexto = [
  `\n>// ¡Hola! Soy Henry – desarrollador, gamer y creador digital con una pasión por la tecnología que desafía límites (y a veces mi paciencia).`,
  `Hago código que *casi siempre* funciona, diseño interfaces limpias, y creo apps para hacer la web un poco más interesante. ¿Mis pronombres? TCP/IP.`,
  `Me manejo bien con JavaScript, Vue, React, Python, PHP, Node, y otras herramientas que uso para llevar ideas a la realidad. Frontend, backend, bases de datos – si lleva código, ahí estoy.`,
  `Ahora mismo, estoy profundizando en Ciberseguridad y Ciencia de Datos, aprendiendo a hackear *éticamente* y hacer el mundo digital más seguro. Así que, si buscas a alguien que construya, rompa y (casi siempre) arregle las cosas, soy tu persona.`
];
 hometexto = "> ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\n> ACCESSING LOGS #27...\n\n--- LOG ENTRY INITIALIZED ---\n\nBienvenido a mi portafolio, inspirado en el icónico Termlink de ROBCO Industries de la serie Fallout.\n\nSoy Henry, un desarrollador backend impulsado por una gran pasión por el software, las redes y todo lo relacionado con la informática. Aquí encontrarás una muestra de mi trabajo, cada proyecto un paso en mi viaje para construir e innovar en el mundo de la tecnología.\n\n> SYSTEM STATUS: ALL SYSTEMS NORMAL\n\n--- PRESIONE CUALQUIER TECLA PARA CONTINUAR ---";

  } else if (language === 'fr') {
    // Add translations in French here
    
     contactinfo = "Coordonnées de contact:\n\n";
 btnhome = '[ACCUEIL]';
 btnsobre = '[À PROPOS]';
 btngal = '[GALERIE]';
 btncontact = '[CONTACT]';
 btnlang = '[LANGUE]';
 btnreturn = '[RETOUR]';
 sitext = 'LES SITES WEB QUE J\'AI CRÉÉS';
 bbnsite = '[SITES INTERNET]';
 bbnvid = "[GALERIE]"
 sobretexto = [
  `\n>// Salut ! Moi, c’est Henry – développeur, gamer et créateur digital, passionné par la tech qui repousse les limites (et parfois ma patience).`,
  `Je code des trucs qui *marchent presque toujours*, je conçois des interfaces propres, et je crée des applis pour rendre le web un peu plus cool. Mes pronoms ? TCP/IP.`,
  `Je maîtrise bien JavaScript, Vue, React, Python, PHP, Node, et d'autres outils que j'utilise pour donner vie aux idées. Front-end, back-end, bases de données – si ça a du code, j’y suis.`,
  `En ce moment, je me plonge dans la cybersécurité et la science des données, apprenant à hacker *éthiquement* pour rendre le monde digital plus sûr. Alors, si tu cherches quelqu'un qui construit, casse et (presque toujours) répare, je suis là.`
];
 hometexto = "> ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\n> ACCESSING LOGS #27...\n\n--- LOG ENTRY INITIALIZED ---\n\nBienvenido a mi portafolio, inspirado en el icónico Termlink de ROBCO Industries de la serie Fallout.\n\nSoy Henry, un desarrollador backend impulsado por una gran pasión por el software, las redes y todo lo relacionado con la informática. Aquí encontrarás una muestra de mi trabajo, cada proyecto un paso en mi viaje para construir e innovar en el mundo de la tecnología.\n\n> SYSTEM STATUS: ALL SYSTEMS NORMAL\n\n--- APPUYEZ SUR N'IMPORTE QUELLE TOUCHE POUR CONTINUER ---";


  } else {
    // Default language (English)
    contactinfo = "Contact info:\n\n ";
    btnhome = '[HOME]';
    btnsobre = '[ABOUT]';
    btngal = '[GALLERY]';
    btncontact = '[CONTACT]';
    btnlang = '[IDIOMA/LANGUE]';
    btnreturn = '[RETURN]';
    sitext = 'WEBSITES I\'VE DONE';
    bbnsite = '[WEBSITES]';
 bbnvid = "[GALLERY]"
    sobretexto = [
  `\n>// Hey there! I'm Henry – a developer, gamer, and digital creator with a love for tech that pushes boundaries (and sometimes my patience).`,
  `I code things that *mostly* work, design clean interfaces, and build apps that aim to make the web a little cooler. My pronouns? TCP/IP.`,
  `I'm fluent in JavaScript, Vue, React, Python, PHP, Node, and a handful of other tools that help me bring ideas to life. Front-end, back-end, databases – you name it, I probably mess with it.`,
  `Right now, I’m diving into Cybersecurity and Data Science, learning to hack *ethically* and keep the digital world a little safer. So if you're looking for someone who can build, break, and (usually) fix things, I’m your guy.`
];
    //Update other text as needed
    hometexto = "> ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\n> ACCESSING LOGS #27...\n\n--- LOG ENTRY INITIALIZED ---\n\nWelcome to my portfolio, inspired by the iconic ROBCO Industries Termlink from the Fallout series.\n\nI’m Henry, a backend developer driven by a deep passion for software, networks, and all things IT. Here, you’ll find a showcase of my work and my contacts.\n\n> SYSTEM STATUS: ALL SYSTEMS NORMAL\n\n--- PRESS ANY KEY TO CONTINUE ---";
  }


  // Store the selected language in localStorage
   localStorage.setItem('selectedLanguage', language);
}


// Handle initial language setup (use the stored language or default to English)
const storedLanguage = localStorage.getItem('selectedLanguage');
if (storedLanguage) {
  changeLanguage(storedLanguage);
} else {
  changeLanguage('en');
}




let contato = document.createElement("a");
		contato.innerText = btncontact;
		contato.classList.add("btn-contact")
		contato.href = "#";
		contato.onclick = () => {
			// remove all a tags and put a text with p and an a tag in the end to take back to preciois page.. Remove text and restore a tag buttons 
			   // Create a <p> element with a message
    const message = document.createElement('p');
    message.innerText = contactinfo
const contactTable = document.createElement('table');
contactTable.style.borderCollapse = 'collapse';

// Contact entries
const contacts = [
    { type: 'GitHub', name:'ARCANGEL0', link: 'https://github.com/ARCANGEL0/' },
    { type: 'WhatsApp/Phone ', name: '+351 927 285 125', link: 'https://api.whatsapp.com/send?phone=351927285125' },
    { type: 'Website',name: 'Main page', link: 'https://arcangelo.net' },
    { type: 'Email',name:'Henry.arcangello@gmail.com*', link: 'mailto:rick_arcangelo@hotmail.com,henry.arcangello@proton.me,henry.arcangello@gmail.com' },
    { type: 'LinkedIn', name:'Henrique Arcangelo', link:
    'https://www.linkedin.com/in/henryarcangelo/' },
    { type: 'Hack The Box', name:'0x0C1053F', link: 'https://app.hackthebox.com/profile/126962' },
];

contacts.forEach(contact => {
    const row = contactTable.insertRow();
    const typeCell = row.insertCell();
    const linkCell = row.insertCell();

    typeCell.innerText = contact.type;
    typeCell.style.padding = '5px';
    typeCell.style.border = '1px solid #008000';

    linkCell.innerHTML = `<a href="${contact.link}" target="_blank">${contact.name}</a>`;
    linkCell.style.padding = '5px';
    linkCell.style.border = '1px solid #008000';
});


// Append the contact form to the message
message.appendChild(contactTable);

    // Create a "Go Back" <a> tag
    const goBackLink = document.createElement("a");
    goBackLink.innerText = btnreturn;
    goBackLink.classList.add("btnReturn")
    goBackLink.href = "#";
    goBackLink.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
        message.remove();
        goBackLink.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
    };

    // Remove the "Logout" and "Contact" buttons
    inicio.remove();
    sobre.remove();
    galeria.remove();
    logout.remove();
    contato.remove();
    idioma.remove();
    terminal.remove();

    // Append the message and "Go Back" link to the 'outro' element
type([message, goBackLink], { processChars: false , wait: 10 }, outro);
    
			
			
		};
		
		let galeria = document.createElement("a");



		galeria.innerText = btngal;
galeria.classList.add("btn-gal")
		galeria.href = "#";
		galeria.onclick = () => {
			
		inicio.remove();

    sobre.remove();

    galeria.remove();
    logout.remove();
    contato.remove();
    idioma.remove();
    terminal.remove() 
    logout.remove()
    
  
  
    var divgallery = document.getElementsByClassName("typer")[4];
    

    
    
// Access the third "typer" element (remember, the index is zero-based)

    divgallery.classList.add('divgal')
    const backGal = document.createElement("a");
    backGal.innerText = btnreturn;
    backGal.style.marginTop = "10px"
    backGal.classList.add("btnReturn")
    backGal.href = "#";
    backGal.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
        divgallery.remove();
        backGal.remove();
        divsites.remove()
        btnVid.remove()
        dvid.remove()
        divbuttons.remove()
        btnSites.remove()
        btnVid.remove()
   // outro.appendChild(logout);
        // outro.appendChild(contato);
type([ inicio,sobre,galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
    };


const btnSites = document.createElement("a");
    btnSites.innerText = bbnsite;
    btnSites.style.marginTop = "10px"
    btnSites.classList.add("btnReturn")
    btnSites.href = "#";
    btnSites.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
       divbuttons.remove()
        dvid.remove();
        btnSites.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([btnVid,divsites], { processChars: false , wait: 10 }, outro);
    };
const btnVid = document.createElement("a");
    btnVid.innerText = bbnvid;
    btnVid.style.marginTop = "10px"
    btnVid.classList.add("btnReturn")
    btnVid.href = "#";
    btnVid.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
  divsites.remove();
  btnVid.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([btnSites,divbuttons, dvid ], { processChars: false , wait: 10 }, outro);
    };


		  
		// Array de URLs de imagens
const VideosUrl = [
    'images/gallery/alpha2.mp4',
    'images/gallery/Videos/lna.mp4',
    'images/gallery/Videos/lnadigital.mp4',
      'images/gallery/Videos/escoteiros.mp4',
    'images/gallery/Videos/arcUI.mp4',
    'images/gallery/Videos/hadesign.mp4',
        'images/gallery/Videos/GreenWaste.mp4',
    'images/gallery/Videos/arcUI.mp4',

    'images/gallery/Videos/pong.mp4',
];

divgallery.appendChild(backGal);
divgallery.appendChild(btnSites)
divgallery.appendChild(btnVid)

btnVid.remove()

const divbuttons = document.createElement("div");
divbuttons.classList.add("galbtns")

const dvid = document.createElement("div");
dvid.classList.add("dvid")

const prevBtn = document.createElement("button");
prevBtn.textContent = "?";
prevBtn.classList.add('carousel-button')
divbuttons.appendChild(prevBtn);

const nextBtn = document.createElement("button");
nextBtn.textContent = "?";
nextBtn.classList.add('carousel-button')
divbuttons.appendChild(nextBtn);

let currentIndex = 0;

prevBtn.onclick = () => {
	currentIndex--
     if (currentIndex<=VideosUrl.length && currentIndex>0) {
    

vid.src=VideosUrl[currentIndex]
     }
     if (currentIndex<0){
     	 currentIndex=0
vid.src=VideosUrl[currentIndex]    
     
}

}
nextBtn.onclick = () => {
	currentIndex++
     if (currentIndex<VideosUrl.length && currentIndex>=0) {
     
vid.src=VideosUrl[currentIndex]

     }
     if (currentIndex>VideosUrl.length){
     	 currentIndex=0
vid.src=VideosUrl[currentIndex]    
     
}
}
divbuttons.style.marginTop='20px'
divbuttons.style.marginBottom='20px'
const vid = document.createElement("video");

vid.src=VideosUrl[currentIndex]
vid.autoplay = true
vid.style.width = '65%'
vid.style.height='20rem'

dvid.appendChild(vid)


divgallery.appendChild(divbuttons)
divgallery.appendChild(dvid)

let divsites = document.createElement("div");
divsites.classList.add("divsites");
let divsimages = document.createElement("div")
divsimages.style.display = "flex";
divsimages.style.flexWrap = "wrap"; // Allow elements to wrap to the next line

let escoteiro = document.createElement("img");
escoteiro.src = "images/Escoteiros.png";
escoteiro.onclick = () => {
  window.open("https://77gemar-jairmattenauer.com", "_blank");
};

let arc = document.createElement("img");
arc.src = "images/Arc.png";
arc.onclick = () => {
  window.open("https://arcangel0.github.io/ARC_UI", "_blank");
};

let info = document.createElement("img");
info.src = "images/Info.png";
info.onclick = () => {
  window.open("https://arcangeloinfo.com.br", "_blank");
};

let lna = document.createElement("img");
lna.src = "images/Lna.png";
lna.onclick = () => {
  window.open("https://lnaassessoriadigital.com", "_blank");
};
let sitestxt = document.createElement("a");
sitestxt.innerText = sitext
sitestxt.classList.add("sitesheader")
sitestxt.style.marginTop="6%"
divsites.appendChild(sitestxt)
divsimages.appendChild(escoteiro);
divsimages.appendChild(arc);
divsimages.appendChild(info);
divsimages.appendChild(lna);

divsimages.style.display = "flex";
divsites.appendChild(divsimages)
divgallery.appendChild(divsites);
divsites.remove()
		}; // function end fim galeriq
		
		let sobre = document.createElement("a");



		sobre.innerText = btnsobre;
		sobre.classList.add("btn-sobre")

		sobre.href = "#";
		sobre.onclick = async () =>  {		
		
		
		
		
		inicio.remove();

    sobre.remove();

    galeria.remove();
    logout.remove();
    contato.remove();
    idioma.remove();
    terminal.remove() 
    logout.remove()
    
    var divsobre = document.getElementsByClassName("typer")[4];
    

    
    
// Access the third "typer" element (remember, the index is zero-based)

    divsobre.classList.add('divsob')
    const backSobre = document.createElement("a");
    backSobre.innerText = btnreturn;
    backSobre.classList.add("btnReturn")
    backSobre.style.marginTop = "10px"
    backSobre.href = "#";
    backSobre.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
        divsobre.remove();
        backSobre.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
    };
    
 
      const gifImage2 = document.createElement("img");
      
		gifImage2.src = "images/Dog.gif";

gifImage2.style.height = "70px"

gifImage2.style.width = "70px"
		  
gifImage2.style.display = "block";
gifImage2.style.margin = "0 auto";
		   
		  


divsobre.appendChild(backSobre)


	await type(
			sobretexto,
			FAST,
			divsobre 
		);
divsobre.appendChild(gifImage2)
	

}
		let terminal = document.createElement("a");
		terminal.innerText = "[TERMINAL]";
     terminal.classList.add("btn-terminal")
		terminal.href = "#";
		terminal.onclick = () => {
		  outro.remove();
		  login()
		};
		
			let inicio = document.createElement("a");

		inicio.innerText = btnhome;
    inicio.classList.add('btn-home')
		inicio.href = "#";
		inicio.onclick = () =>  {		
		  
		  function goBak() {
        // Remove the event listeners to prevent multiple calls
        document.removeEventListener("click", goBak);
        document.removeEventListener("keydown", goBak);
        
        // Check if elements exist before trying to manipulate them
        if (divinicio) {
            divinicio.remove(); // Remove the divinicio if it exists
        }
        
        if (goBackLinkIn) {
            goBackLinkIn.remove(); // Remove the goBackLinkIn if it exists
        }
    
        // Assuming 'outro' is a valid reference to an existing element
        if (outro) {
            // If you want to append 'logout' and 'contato' back to 'outro', ensure they are defined
            // outro.appendChild(logout);
            // outro.appendChild(contato);
            
            // Make sure 'type' is a valid function and is defined
            type([inicio, sobre, galeria, contato, idioma, terminal, logout], { processChars: false, wait: 10 }, outro);
        } else {
            console.error("The 'outro' element is not defined.");
        }
    }
    
    // Create elements
    const gifImage = document.createElement("img");
    const divinicio = document.createElement("div");
    divinicio.classList.add("divinicio");
    const divtextinicio = document.createElement("div");
    divtextinicio.classList.add("divtextinicio");
    const divgif = document.createElement("div");
    divgif.classList.add("divgif");
    const iniciotext = document.createElement("p");
    
    // Add event listeners
    document.addEventListener("click", goBak);
    document.addEventListener("keydown", goBak);
    
// Set the text for the <p> element
iniciotext.innerText = hometexto

iniciotext.classList.add("inicioheader")

// Assuming you have a container div with an id of "portfolio" to append the <p> element to


gifImage.src = "images/Code.gif";

gifImage.style.marginTop = "15px"
gifImage.style.marginBottom= "15px"
gifImage.style.width = "92vw"
gifImage.style.height= "50vh"
// Append the image to divgif



iniciotext.style.top = "0";
iniciotext.style.left = "0";
iniciotext.style.width = "87vw";
iniciotext.style.height = "100%";
iniciotext.style.margin = "0";
divinicio.style.marginLeft = "20px"
divinicio.appendChild(divtextinicio);
divinicio.appendChild(divgif);
divtextinicio.appendChild(iniciotext);



		  const goBackLinkIn = document.createElement("a");
    goBackLinkIn.innerText = btnreturn;
    goBackLinkIn.classList.add('btnReturn')
    goBackLinkIn.style.marginTop = "10px"
    goBackLinkIn.href = "#";
    goBackLinkIn.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
        divinicio.remove();
        goBackLinkIn.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
    };


    // Remove the "Logout" and "Contact" buttons
    inicio.remove();
    sobre.remove();
    galeria.remove();
    logout.remove();
    contato.remove();
    idioma.remove();
    terminal.remove();

    // Append the message and "Go Back" link to the 'outro' element
type([divinicio, goBackLinkIn], { processChars: false , wait: 10 }, outro);
    
		
		};
		
		
		let idioma = document.createElement("a");
    idioma.classList.add("btn-lang")


		idioma.innerText = btnlang;

		idioma.href = "#";
		idioma.onclick = () => {

inicio.remove();
    sobre.remove();
    galeria.remove();
    logout.remove();
    contato.remove();
    idioma.remove();
    terminal.remove();
			
const backLang = document.createElement("a");
    backLang.innerText = btnreturn
    backLang.classList.add("btnReturn")
    backLang.href = "#";
    backLang.onclick = () => {
        // Remove the message and "Go Back" link and restore the "Logout" and "Contact" buttons
        port.remove();
        spa.remove();
        eng.remove()
        fre.remove()
        backLang.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
    };

    // Remove the "Logout" and "Contact" buttons
    


let port = document.createElement("a");
		port.innerText = "[PORTUGUÊS]";
		port.href = "#";
		port.onclick = () => { 
		  
		  changeLanguage('pt')
		  
		  updateTexts()
		  port.remove();
        spa.remove();
        eng.remove()
        fre.remove()
        backLang.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);
		  
		}
		
let eng = document.createElement("a");
		eng.innerText = "[ENGLISH]";
		eng.href = "#";
		eng.onclick = () => { 
		  changeLanguage('en')
		  
		  updateTexts() 
		  
		  port.remove();
        spa.remove();
        eng.remove()
        fre.remove()
        backLang.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);

		}
		
let spa = document.createElement("a");
		spa.innerText = "[ESPANÕL]";
		spa.href = "#";
		spa.onclick = () => { 
		  changeLanguage('es')
		  updateTexts()
		  port.remove();
        spa.remove();
        eng.remove()
        fre.remove()
        backLang.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);

		}
		
let fre = document.createElement("a");
		fre.innerText = "[FRANÇAIS]";
		fre.href = "#";
		fre.onclick = () => { 
		  changeLanguage('fr')
		  updateTexts()
		  port.remove();
        spa.remove();
        eng.remove()
        fre.remove()
        backLang.remove();
        // outro.appendChild(logout);
        // outro.appendChild(contato);
type([inicio, sobre, galeria, contato,idioma, terminal, logout ], { processChars: false , wait: 10 }, outro);

		}
    // Append the message and "Go Back" link to the 'outro' element
type([backLang,port, eng, spa, fre], { processChars: false , wait: 10 }, outro);
		  
		};
		let logout = document.createElement("a");
		logout.innerText = "[LOGOUT]";
		logout.href = "#";
		logout.onclick = () => {
			
			new Game({onQuit: resolve});
		};

	;

		 type([inicio, sobre, galeria, contato,idioma, terminal, logout], { processChars: false , wait: 5 }, outro);

		logout.focus();
	});

	outro.remove();
}

const stylesheets = ["fallout"];
const templates = ["fallout"];

export { stylesheets, templates };
export default command;