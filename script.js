document.addEventListener("DOMContentLoaded", function () {
    // Referencias a elementos del DOM
    const chatBox = document.getElementById("chat-box");
    const optionsBox = document.getElementById("options-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    // Variable para controlar el paso del flujo
    let step = 0;

    // Objeto para almacenar las respuestas del usuario
    let userData = {
        nombre: "",
        health: false,      // Interés en salud (Medicina)
        tech: false,        // Interés en tecnología (Ingeniería)
        finance: false,     // Interés en finanzas (Ciencias Económicas)
        leadership: false,  // Interés en liderazgo (Administración de Empresas)
        faculty: "",
        career: "",
        presupuesto: "",
        universidad: "",
        jornada: ""
    };

    // Función para decidir la universidad según presupuesto
    function decideUniversity(presupuesto) {
        if (presupuesto === "bajo") return "USAC";
        else if (presupuesto === "medio") return "UMG";
        else if (presupuesto === "alto") return "Del Valle"; // O también podría ser Francisco Marroquín
        else return "USAC";
    }

    // Función para mostrar mensajes del bot
    function botMessage(message) {
        let botMsg = document.createElement("p");
        botMsg.innerHTML = `<strong>🤖 Chatbot:</strong> ${message}`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para mostrar mensajes del usuario
    function userMessage(message) {
        let userMsg = document.createElement("p");
        userMsg.innerHTML = `<strong>👤 Tú:</strong> ${message}`;
        chatBox.appendChild(userMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para crear botones de opción
    function showOptions(options, callback) {
        optionsBox.innerHTML = ""; // Limpiar opciones anteriores
        options.forEach(option => {
            let btn = document.createElement("button");
            btn.textContent = option;
            btn.classList.add("option-btn");
            btn.addEventListener("click", function () {
                userMessage(option);
                callback(option);
            });
            optionsBox.appendChild(btn);
        });
    }

    // Función que controla el flujo de la conversación
    function nextStep() {
        switch (step) {
            case 0:
                // Paso 0: Pedir el nombre
                botMessage("¡Hola! 😊 ¿Cómo te llamas, amig@?");
                break;

            case 1:
                // Paso 1: Preguntar interés en salud (Medicina)
                botMessage("¿Te interesa cuidar la salud y el bienestar? 🏥💊");
                showOptions(["Sí", "No"], function (answer) {
                    userData.health = (answer === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 2:
                // Paso 2: Preguntar interés en tecnología (Ingeniería)
                botMessage("¿Te gusta programar o trabajar con tecnología? 💻🤖");
                showOptions(["Sí", "No"], function (answer) {
                    userData.tech = (answer === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 3:
                // Paso 3: Preguntar interés en finanzas (Ciencias Económicas)
                botMessage("¿Te apasionan los números, la economía y las finanzas? 💰📊");
                showOptions(["Sí", "No"], function (answer) {
                    userData.finance = (answer === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 4:
                // Paso 4: Preguntar interés en liderazgo (Administración de Empresas)
                botMessage("¿Te emociona liderar y gestionar equipos? 👥🚀");
                showOptions(["Sí", "No"], function (answer) {
                    userData.leadership = (answer === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 5:
                // Paso 5: Determinar la facultad a partir de las respuestas de aptitudes
                let interests = [];
                if (userData.health) interests.push("Medicina");
                if (userData.tech) interests.push("Ingeniería");
                if (userData.finance) interests.push("Ciencias Económicas");
                if (userData.leadership) interests.push("Administración de Empresas");

                if (interests.length === 0) {
                    // Si no se marcó ninguna, se asigna por defecto Administración de Empresas
                    userData.faculty = "Administración de Empresas";
                    step++;
                    nextStep();
                } else if (interests.length === 1) {
                    userData.faculty = interests[0];
                    step++;
                    nextStep();
                } else {
                    // Si hay más de una opción, se le pide al usuario que escoja
                    botMessage(`¡Genial! Hemos notado que te interesan varias áreas: ${interests.join(", ")}. ¿Cuál te gustaría explorar más? 🌟`);
                    showOptions(interests, function (answer) {
                        userData.faculty = answer;
                        step++;
                        nextStep();
                    });
                }
                break;

            case 6:
                // Paso 6: Preguntar por la carrera específica según la facultad elegida
                if (userData.faculty === "Medicina") {
                    botMessage("En Medicina, ¿prefieres tratar pacientes de forma general o te interesa alguna especialidad en particular? 🤔👩‍⚕️👨‍⚕️");
                    showOptions(["Medicina General 😷", "Cirugía ✂️", "Pediatría 👶", "Neurología 🧠"], function (answer) {
                        userData.career = answer;
                        step++;
                        nextStep();
                    });
                } else if (userData.faculty === "Ingeniería") {
                    botMessage("En el fascinante mundo de la Ingeniería, ¿qué área te apasiona más? 🚀");
                    showOptions(["Ingeniería en Sistemas 💻", "Ingeniería Electrónica ⚡", "Ingeniería Civil 🏗️", "Ingeniería Industrial 📈"], function (answer) {
                        userData.career = answer;
                        step++;
                        nextStep();
                    });
                } else if (userData.faculty === "Ciencias Económicas") {
                    botMessage("Dentro de las Ciencias Económicas, ¿cuál de estas áreas te llama más la atención? 📊");
                    showOptions(["Contaduría 🧾", "Economía 📈", "Finanzas 💸", "Administración de Empresas 🤝"], function (answer) {
                        userData.career = answer;
                        step++;
                        nextStep();
                    });
                } else if (userData.faculty === "Administración de Empresas") {
                    botMessage("En Administración de Empresas, ¿qué área te gustaría explorar? 📣");
                    showOptions(["Marketing 📣", "Recursos Humanos 👥", "Finanzas Corporativas 💹", "Emprendimiento 🚀"], function (answer) {
                        userData.career = answer;
                        step++;
                        nextStep();
                    });
                }
                break;

            case 7:
                // Paso 7: Preguntar por el presupuesto para recomendar la universidad
                botMessage("¡Cuéntame! ¿Cuál es tu presupuesto para tus estudios? 💵");
                showOptions(["Bajo 💲", "Medio 💲💲", "Alto 💲💲💲"], function (answer) {
                    // Removemos los emojis para la lógica interna
                    userData.presupuesto = answer.split(" ")[0].toLowerCase();
                    step++;
                    nextStep();
                });
                break;

            case 8:
                // Paso 8: Preguntar por la jornada
                botMessage("¿Qué jornada se adapta mejor a tu ritmo? ☀️🌙");
                showOptions(["Matutina 🌞", "Vespertina 🌇", "Nocturna 🌙"], function (answer) {
                    // Removemos los emojis para la lógica interna si es necesario
                    userData.jornada = answer.split(" ")[0];
                    step++;
                    nextStep();
                });
                break;

            case 9:
                // Paso 9: Determinar la universidad y mostrar la recomendación final
                userData.universidad = decideUniversity(userData.presupuesto);
                botMessage(`🎓 ¡Recomendación Final para ${userData.nombre}!  
  🏫 Universidad: ${userData.universidad}  
  📚 Facultad: ${userData.faculty}  
  🛠️ Carrera: ${userData.career}  
  ⏰ Jornada: ${userData.jornada}`);
                optionsBox.innerHTML = "";
                break;

            default:
                break;
        }
    }

    // Capturamos el nombre (paso 0) con el botón de enviar
    sendButton.addEventListener("click", function () {
        let inputText = userInput.value.trim();
        if (inputText !== "" && step === 0) {
            userMessage(inputText);
            userData.nombre = inputText;
            userInput.value = "";
            // Ocultar el prompt de texto y el botón después de capturar el nombre
            userInput.style.display = "none";
            sendButton.style.display = "none";
            step++;
            nextStep();
        }
    });

    // También se permite enviar el nombre con la tecla Enter
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && step === 0) {
            let inputText = userInput.value.trim();
            if (inputText !== "") {
                userMessage(inputText);
                userData.nombre = inputText;
                userInput.value = "";
                // Ocultar el prompt de texto y el botón después de capturar el nombre
                userInput.style.display = "none";
                sendButton.style.display = "none";
                step++;
                nextStep();
            }
        }
    });

    // Iniciar el chatbot
    nextStep();
});
