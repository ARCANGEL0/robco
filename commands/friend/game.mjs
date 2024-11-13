// game.mjs

const gameData = {
        en: {
            start: "You're trapped in a dungeon with your friend. You see a barrel. What do you do?",
            pathA: "The barrel rolls aside and you find a secret tunnel. What do you do?",
            pathB: "Your friend hands you a note. What do you do?",
            pathA1: "You start to escape, but your friend is too weak to go. They hand you a note. What do you do?",
            pathB1: "The note says 'Don't leave me here.' Do you want to leave your friend or stay?",
            pathA2: "It is too dark to read the note. What do you do?",
            pathA3: "You crawl through the tunnel to a beach. You see the water and the vast ocean ahead. What do you do?",
            pathA4: "In the water, you see a boat. What do you do?",
            easterEggEnding: "You won.",
            freedomEnding: "Congratulations, you're heading to a new world!",
            noteMessage: "The note says: 'Don't leave me here.'",
            invalid: "You can't do this here.",
            blockedPath: "The passage is now blocked. You can't go back."
        },
        es: {
            start: "Estás atrapado en una mazmorra con tu amigo. Ves un barril. ¿Qué haces?",
            pathA: "El barril rueda a un lado y encuentras un túnel secreto. ¿Qué haces?",
            pathB: "Tu amigo te da una nota. ¿Qué haces?",
            pathA1: "Comienzas a escapar, pero tu amigo está demasiado débil para ir. Te da una nota. ¿Qué haces?",
            pathB1: "La nota dice 'No me dejes aquí'. ¿Quieres dejar a tu amigo o quedarte?",
            pathA2: "Es demasiado oscuro para leer la nota. ¿Qué haces?",
            pathA3: "Te arrastras por el túnel hasta una playa. Ves el agua y el vasto océano frente a ti. ¿Qué haces?",
            pathA4: "En el agua, ves un bote. ¿Qué haces?",
            easterEggEnding: "Has ganado.",
            freedomEnding: "Felicidades, te diriges a un nuevo mundo!",
            noteMessage: "La nota dice: 'No me dejes aquí.'",
            invalid: "No puedes hacer esto aquí.",
            blockedPath: "El pasaje está bloqueado. No puedes regresar."
        },
        fr: {
            start: "Vous êtes piégé dans un donjon avec votre ami. Vous voyez un tonneau. Que faites-vous?",
            pathA: "Le tonneau roule de côté et vous trouvez un tunnel secret. Que faites-vous?",
            pathB: "Votre ami vous tend une note. Que faites-vous?",
            pathA1: "Vous commencez à vous échapper, mais votre ami est trop faible pour partir. Il vous tend une note. Que faites-vous?",
            pathB1: "La note dit 'Ne me laisse pas ici'. Voulez-vous laisser votre ami ou rester?",
            pathA2: "Il fait trop sombre pour lire la note. Que faites-vous?",
            pathA3: "Vous rampez à travers le tunnel jusqu'à une plage. Vous voyez l'eau et l'océan immense devant vous. Que faites-vous?",
            pathA4: "Dans l'eau, vous voyez un bateau. Que faites-vous?",
            easterEggEnding: "Vous avez gagné.",
            freedomEnding: "Félicitations, vous vous dirigez vers un nouveau monde!",
            noteMessage: "La note dit : 'Ne me laisse pas ici.'",
            invalid: "Vous ne pouvez pas faire ça ici.",
            blockedPath: "Le passage est maintenant bloqué. Vous ne pouvez pas revenir."
        },
        pt: {
            start: "Você está preso em uma masmorra com seu amigo. Você vê um barril. O que você faz?",
            pathA: "O barril rola para o lado e você encontra um túnel secreto. O que você faz?",
            pathB: "Seu amigo lhe entrega uma nota. O que você faz?",
            pathA1: "Você começa a escapar, mas seu amigo está fraco demais para ir. Ele te entrega uma nota. O que você faz?",
            pathB1: "A nota diz 'Não me deixe aqui'. Você quer deixar seu amigo ou ficar?",
            pathA2: "Está muito escuro para ler a nota. O que você faz?",
            pathA3: "Você rasteja pelo túnel até uma praia. Você vê a água e o vasto oceano à frente. O que você faz?",
            pathA4: "Na água, você vê um barco. O que você faz?",
            easterEggEnding: "Você ganhou.",
            freedomEnding: "Parabéns, você está indo para um novo mundo!",
            noteMessage: "A nota diz: 'Não me deixe aqui.'",
            invalid: "Você não pode fazer isso aqui.",
            blockedPath: "A passagem está bloqueada. Não é possível voltar."
        }
    };

    const options = {
    start: {
        barrel: [
            // Move barrel options in multiple languages
            /move.*barrel/i, /roll.*barrel/i, /push.*barrel/i, /shift.*barrel/i, /nudge.*barrel/i, 
            /drag.*barrel/i, /slide.*barrel/i, /shove.*barrel/i, /kick.*barrel/i, /pull.*barrel/i,
            /lift.*barrel/i, /toss.*barrel/i, /move.*drum/i, /roll.*drum/i, /push.*drum/i,
            /mover.*barril/i, /rodar.*barril/i, /empujar.*barril/i, /deslizar.*barril/i,
            /arrastrar.*barril/i, /mueve.*barril/i, /patear.*barril/i, /levantar.*barril/i,
            /déplacer.*tonneau/i, /rouler.*tonneau/i, /pousser.*tonneau/i, /glisser.*tonneau/i,
            /tirer.*tonneau/i, /soulever.*tonneau/i, /bouger.*tonneau/i, /balancer.*tonneau/i,
            /mover.*barril/i, /empurrar.*barril/i, /deslizar.*barril/i, /arrastar.*barril/i,
            /puxar.*barril/i, /levantar.*barril/i, /rolar.*barril/i, /chutar.*barril/i
        ],
        friend: [
            // Stay with friend options in multiple languages
            /sit.*friend/i, /stay.*friend/i, /stay.*with.*friend/i, /talk.*friend/i, /check.*friend/i,
            /be.*with.*friend/i, /help.*friend/i, /ask.*if.*okay/i, /ask.*friend.*okay/i, /watch.*friend/i,
            /sit beside.*friend/i, /sit next.*friend/i, /stay.*near.*friend/i, /look.*friend/i, /comfort.*friend/i,
            /see.*friend/i, /support.*friend/i, /stay.*around.*friend/i, /sit with.*friend/i, /talk to friend/i,
            /sentarse.*amigo/i, /quedarse.*amigo/i, /hablar.*amigo/i, /ver.*amigo/i, /ayudar.*amigo/i,
            /sentar.*junto.*amigo/i, /estar.*con.*amigo/i, /preguntar.*si.*amigo.*bien/i,
            /cuidar.*amigo/i, /acompañar.*amigo/i, /mirar.*amigo/i, /hablar.*con.*amigo/i,
            /estar.*al lado.*amigo/i, /permanecer.*amigo/i, /apoyar.*amigo/i,
            /s’asseoir.*ami/i, /rester.*ami/i, /être.*ami/i, /parler.*ami/i, /demander.*ami.*va bien/i,
            /surveiller.*ami/i, /s’occuper.*ami/i, /aider.*ami/i, /tenir.*compagnie.*ami/i,
            /regarder.*ami/i, /conforter.*ami/i, /être.*à.*côté.*ami/i, /se poser.*ami/i, /protéger.*ami/i,
            /sentar.*amigo/i, /ficar.*amigo/i, /estar.*com.*amigo/i, /ajudar.*amigo/i, /ver.*amigo/i,
            /cuidar.*amigo/i, /ficar.*ao lado.*amigo/i, /perguntar.*se.*amigo.*bem/i,
            /permanecer.*amigo/i, /apoiar.*amigo/i, /confortar.*amigo/i, /permanecer ao lado.*amigo/i,
            /acompanhar.*amigo/i, /conversar.*amigo/i, /esperar.*amigo/i, /perguntar como está.*amigo/i
        ]
    },
    pathA: [
        // Enter tunnel options
        /enter.*tunnel/i, /go.*tunnel/i, /crawl.*tunnel/i, /in.*tunnel/i, /tunnel.*enter/i, 
        /tunnel.*go/i, /explore.*tunnel/i, /go into.*tunnel/i, /tunnel.*crawl/i, /tunnel.*head/i,
        /entra.*tunel/i, /explora.*tunel/i, /siga.*tunel/i, /entrer.*tunnel/i, /descendre.*tunnel/i,
        /aller.*tunnel/i, /fugir.*tunnel/i, /se.*tunnel/i, /continue.*tunnel/i, /tunel.*suivre/i,
        /dentro.*tunel/i, /em.*tunel/i, /seguir.*tunel/i, /à.*tunnel/i, /dans.*tunnel/i
    ],
    pathB: [
        // Light match options
        /light.*match/i, /ignite.*match/i, /burn.*match/i, /spark.*match/i, /strike.*match/i,
        /fire.*match/i, /fosforo.*ligar/i, /ligar.*fosforo/i, /ignite/i, /incendiar/i,
        /fósforo.*acender/i, /prender.*fosforo/i, /strike.*allumette/i, /burn.*lighter/i, /flame.*match/i,
        /acender.*fósforo/i, /riser.*fósforo/i, /risque.*allumette/i, /acender.*fósforo/i, /ignition.*match/i,
        /brûler.*allumette/i, /ligar.*isqueiro/i, /queimar.*fosforo/i, /ignite.*light/i, /light.*up/i
    ],
    pathA1: [
        // Read note options
        /read.*note/i, /inspect.*note/i, /look.*note/i, /study.*note/i, /check.*note/i,
        /examine.*note/i, /observe.*note/i, /open.*note/i, /ver.*nota/i, /lire.*note/i,
        /estudar.*nota/i, /ler.*nota/i, /checar.*nota/i, /verificar.*nota/i, /consulter.*note/i,
        /regarder.*note/i, /nota.*revisar/i, /nota.*ler/i, /olhar.*nota/i, /conferir.*nota/i,
        /ver.*nota/i, /nota.*ver/i, /examiner.*note/i, /lire.*la.*note/i, /inspecter.*note/i,
        /relire.*note/i, /voir.*le.*message/i, /regarder.*le message/i, /ver.*mensagem/i, /analisar.*nota/i,
        /estude.*nota/i, /leia.*letra/i, /abrir.*nota/i, /consultar.*nota/i, /rever.*nota/i
    ],
    pathB1: [
        // Stay with friend options after reading note
        /stay/i, /don’t leave/i, /remain/i, /not leave/i, /not go/i, 
        /fique/i, /não vá/i, /ficar aqui/i, /ficar/i, /não deixar/i, 
        /stay here/i, /quedarse/i, /quédate/i, /não vá embora/i, /permaneça aqui/i,
        /ficar ao lado/i, /permanecer/i, /quedar.*amigo/i, /fique.*aqui/i, /não vá embora/i,
        /reste/i, /ne pas partir/i, /proche.*ami/i, /rester ici/i, /ami.*ne pas partir/i,
        /ne pas laisser/i, /ne me laisse pas/i, /pas laisser ici/i, /quedate.*aqui/i, /quédate conmigo/i,
        /stay.*with.*friend/i, /don’t leave.*here/i, /be by side/i, /stay near/i, /don’t go/i
    ],
    pathA2: [
        // Leave or go back options (dark tunnel)
        /leave/i, /exit/i, /escape/i, /walk out/i, /go back/i, /turn back/i, /backtrack/i, 
        /salir/i, /sal.*tunel/i, /regresar/i, /volver/i, /sortir/i, /retourner/i,
        /sair.*tunel/i, /abandonar/i, /dejar atrás/i, /retour/i, /voltar atrás/i,
        /retornar/i, /volver atrás/i, /escapar/i, /deixar/i, /fugir dali/i,        /leave/i, /exit/i, /escape/i, /walk out/i, /go back/i, /turn back/i, /backtrack/i, 
        /salir/i, /sal.*tunel/i, /regresar/i, /volver/i, /sortir/i, /retourner/i,
        /sair.*tunel/i, /abandonar/i, /dejar atrás/i, /retour/i, /voltar atrás/i,
        /retornar/i, /volver atrás/i, /escapar/i, /deixar/i, /fugir dali/i,
        /evacuar/i, /fugir.*tunel/i, /retomar/i, /andar para trás/i, /voltar ao ponto inicial/i,
        /partir/i, /deixar.*túnel/i, /quitter.*tunnel/i, /partir.*tunnel/i, /descendre/i
    ],
    pathA3: [
        // Look around on the beach or read note
        /look/i, /see/i, /observe/i, /watch/i, /examine/i, /inspect/i, /scan/i, 
        /look around/i, /search/i, /explore/i, /view/i, /gaze/i, /inspect surroundings/i,
        /mirar/i, /ver/i, /observar/i, /explorar/i, /buscar/i, /revisar/i,
        /mirar.*alrededor/i, /examinar.*entorno/i, /inspeccionar.*area/i, /ver.*playa/i,
        /explorer/i, /regarder/i, /scruter/i, /inspecter/i, /regarder.*plage/i,
        /explorer.*environs/i, /chercher/i, /analyser.*plage/i, /regarder.*autour/i,
        /olhar/i, /verificar/i, /examinar/i, /procurar/i, /analisar/i, /visualizar/i,
        /investigar/i, /ver o que tem/i, /ler nota/i, /ver nota/i, /ler mensagem/i,
        /read.*note/i, /inspect.*note/i, /look.*note/i, /study.*note/i, /check.*note/i,
        /examine.*note/i, /observe.*note/i, /open.*note/i, /ver.*nota/i, /lire.*note/i,
        /ler nota/i, /verificar nota/i, /checar nota/i, /analisar nota/i, /verificar mensagem/i
    ],
    pathA4: [
        // Get on the boat options
        /get.*boat/i, /board.*boat/i, /enter.*boat/i, /ride.*boat/i, /step.*boat/i,
        /go to.*boat/i, /jump in.*boat/i, /climb.*boat/i, /embark.*boat/i, /take.*boat/i,
        /embarcar.*barco/i, /ir.*barco/i, /subir.*barco/i, /entrar.*barco/i, /andar.*barco/i,
        /tomar.*barco/i, /ir.*para.*barco/i, /pular.*dentro.*barco/i, /embarcar no barco/i,
        /prendre.*bateau/i, /monter.*bateau/i, /embarquer.*bateau/i, /entrer.*bateau/i, 
        /sauter.*bateau/i, /monter dans.*bateau/i, /prendre.*la mer/i, /aller.*bateau/i,
        /entrar.*barco/i, /entrar no barco/i, /subir para o barco/i, /subir no barco/i,
        /pegar.*barco/i, /embarque no barco/i, /dirigir-se ao barco/i, /navegar.*mar/i
    ]
};


let currentStage = 'start';
let hasTriedToReturn = false;

function friendRPG(input) {
    const selectedLanguage = "en"; 
    const command = input.trim().toLowerCase();

    if (options[currentStage]) {
    if (currentStage === 'start') {
        // Check if the command matches any of the barrel-related options
        if (options.start.barrel.some(regex => regex.test(command))) {
            currentStage = 'pathA';
            return gameData[selectedLanguage].pathA;
        } 
        // Check if the command matches any of the friend-related options
        else if (options.start.friend.some(regex => regex.test(command))) {
            currentStage = 'pathB';
            return gameData[selectedLanguage].pathB;
        } 
        // If neither matches, return an invalid response
        else {
            return gameData[selectedLanguage].invalid;
        }
    } else {
        // Proceed with the rest of the game stages
        switch (currentStage) {
            case 'pathA':
                if (options[currentStage].some(regex => regex.test(command))) {
                    currentStage = 'pathA1';
                    return gameData[selectedLanguage].pathA1;
                } else {
                    return gameData[selectedLanguage].invalid;
                }
                break;
                
            case 'pathB':
                if (options[currentStage].some(regex => regex.test(command))) {
                    currentStage = 'pathB1';
                    return gameData[selectedLanguage].pathB1;
                } else {
                    return gameData[selectedLanguage].invalid;
                }
                break;
                
            case 'pathA1':
                if (options[currentStage].some(regex => regex.test(command))) {
                    currentStage = 'pathA2';
                    return gameData[selectedLanguage].pathA2;
                } else {
                    return gameData[selectedLanguage].invalid;
                }
                break;
                
            case 'pathB1':
                // Check for the "stay" command that triggers the easter egg ending
                if (options[currentStage].some(regex => regex.test(command))) {
                    return gameData[selectedLanguage].easterEggEnding;
                } else {
                    return gameData[selectedLanguage].freedomEnding;
                }
                break;
                
            case 'pathA2':
                if (options[currentStage].some(regex => regex.test(command))) {
                    if (!hasTriedToReturn) {
                        hasTriedToReturn = true;
                        return gameData[selectedLanguage].blockedPath;
                    } else {
                        currentStage = 'pathA3';
                        return gameData[selectedLanguage].pathA3;
                    }
                } else {
                    return gameData[selectedLanguage].invalid;
                }
                break;
                
            case 'pathA3':
                if (options[currentStage].some(regex => regex.test(command))) {
                    return gameData[selectedLanguage].noteMessage;
                } else {
                    currentStage = 'pathA4';
                    return gameData[selectedLanguage].pathA4;
                }
                break;
                
            case 'pathA4':
                if (options[currentStage].some(regex => regex.test(command))) {
                    return gameData[selectedLanguage].freedomEnding;
                } else {
                    return gameData[selectedLanguage].invalid;
                }
                break;
                
            default:
                return gameData[selectedLanguage].invalid;
        }
    }
} else {
    return gameData[selectedLanguage].invalid;
}
    
}

export default friendRPG;