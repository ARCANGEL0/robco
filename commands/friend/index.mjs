document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('game-output');
    const inputElement = document.getElementById('user-input');
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

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
        start: [
            /move.*barrel/i, /roll.*barrel/i, /push.*barrel/i, /sit.*friend/i, /stay.*friend/i, 
            /talk.*friend/i, /watch.*friend/i, /be.*friend/i, /check.*friend/i, /next.*friend/i, 
            /stay.*by.*friend/i, /sit.*by.*friend/i, /stay.*near.*friend/i, /ask.*friend/i, /care.*friend/i,
            /sit beside.*friend/i, /help.*friend/i, /ask.*ok/i, /ask.*fine/i, /stay.*around/i,
            /mover.*barril/i, /rodar.*barril/i, /sentar.*amigo/i, /ficar.*amigo/i, /conversar.*amigo/i,
            /olhar.*amigo/i, /checar.*amigo/i, /ajudar.*amigo/i, /está bem/i, /fique.*amigo/i,
            /assis.*ami/i, /reste.*ami/i, /voir.*ami/i, /parle.*ami/i, /demande.*ami/i,
            /verificar.*amigo/i, /falar.*amigo/i, /auxilia.*amigo/i, /regarde.*ami/i, /être.*ami/i,
            /junto.*amigo/i, /perguntar.*amigo/i, /parar.*amigo/i, /parler.*ami/i, /être là/i
        ],
        pathA: [
            /enter.*tunnel/i, /go.*tunnel/i, /crawl.*tunnel/i, /in.*tunnel/i, /tunnel.*enter/i, 
            /tunnel.*go/i, /explore.*tunnel/i, /go into.*tunnel/i, /tunnel.*crawl/i, /tunnel.*head/i,
            /entra.*tunel/i, /explora.*tunel/i, /siga.*tunel/i, /entrer.*tunnel/i, /descendre.*tunnel/i,
            /aller.*tunnel/i, /fugir.*tunnel/i, /se.*tunnel/i, /continue.*tunnel/i, /tunel.*suivre/i,
            /dentro.*tunel/i, /em.*tunel/i, /seguir.*tunel/i, /à.*tunnel/i, /dans.*tunnel/i
        ],
        // ... continue adding additional phrases for pathB, pathA1, etc.
    };

    let currentStage = 'start';
    let hasTriedToReturn = false;

    const displayText = (text) => {
        outputElement.textContent += text + '\n';
        outputElement.scrollTop = outputElement.scrollHeight;
    };

    const handleInput = (input) => {
        const command = input.trim().toLowerCase();
        inputElement.value = '';

        // Check if any regex in the current stage options matches the input
        if (options[currentStage].some(regex => regex.test(command))) {
            switch (currentStage) {
                case 'start':
                    if (options.start.slice(0, 3).some(regex => regex.test(command))) {
                        currentStage = 'pathA';
                        displayText(gameData[selectedLanguage].pathA);
                    } else {
                        currentStage = 'pathB';
                        displayText(gameData[selectedLanguage].pathB);
                    }
                    break;
                case 'pathA':
                    currentStage = 'pathA1';
                    displayText(gameData[selectedLanguage].pathA1);
                    break;
case 'pathB':
                    currentStage = 'pathB1';
                    displayText(gameData[selectedLanguage].pathB1);
                    break;
                case 'pathA1':
                    currentStage = 'pathA2';
                    displayText(gameData[selectedLanguage].pathA2);
                    break;
                case 'pathB1':
                    // Opção para Easter Egg (ficar com o amigo) ou final de liberdade (sair)
                    if (options.pathB1.some(regex => regex.test(command))) {
                        displayText(gameData[selectedLanguage].easterEggEnding);
                    } else {
                        displayText(gameData[selectedLanguage].freedomEnding);
                    }
                    inputElement.disabled = true;
                    break;
                case 'pathA2':
                    if (/voltar|go back|leave/i.test(command) && !hasTriedToReturn) {
                        hasTriedToReturn = true;
                        displayText(gameData[selectedLanguage].blockedPath);
                    } else {
                        currentStage = 'pathA3';
                        displayText(gameData[selectedLanguage].pathA3);
                    }
                    break;
                case 'pathA3':
                    // Se o jogador escolher "ler nota" ao invés de prosseguir diretamente para o barco
                    if (/read.*note|ler.*nota/i.test(command)) {
                        displayText(gameData[selectedLanguage].noteMessage);
                    } else {
                        currentStage = 'pathA4';
                        displayText(gameData[selectedLanguage].pathA4);
                    }
                    break;
                case 'pathA4':
                    displayText(gameData[selectedLanguage].freedomEnding);
                    inputElement.disabled = true;
                    break;
                default:
                    displayText(gameData[selectedLanguage].invalid);
                    break;
            }
        } else {
            displayText(gameData[selectedLanguage].invalid);
        }
    };

    displayText(gameData[selectedLanguage].start);
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleInput(inputElement.value);
        }
    });
});