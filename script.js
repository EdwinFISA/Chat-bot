document.addEventListener("DOMContentLoaded", function () {
    // Referencias a elementos del DOM
    const chatBox = document.getElementById("chat-box");
    const optionsBox = document.getElementById("options-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    // Paso de la conversación
    let step = 0;

    // Respuestas del usuario
    let userData = {
        nombre: "",
        gustaProgramar: false,
        gustaAnatomia: false,
        gustaFinanzas: false,
        gustaMatematicas: false,
        presupuesto: "",
        jornada: "",
        carrera: "",
        universidad: ""
    };

    // Base de hechos o reglas simples
    const universidades = {
        "USAC": { costo: "bajo" },
        "UMG": { costo: "medio" },
        "Del Valle": { costo: "alto" },
        "Francisco Marroquín": { costo: "alto" }
    };

    // Mostrar mensaje del bot
    function botMessage(message) {
        let botMsg = document.createElement("p");
        botMsg.innerHTML = `<strong>🤖 Chatbot:</strong> ${message}`;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Mostrar mensaje del usuario
    function userMessage(message) {
        let userMsg = document.createElement("p");
        userMsg.innerHTML = `<strong>👤 Tú:</strong> ${message}`;
        chatBox.appendChild(userMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Crear botones de opción
    function showOptions(options, callback) {
        optionsBox.innerHTML = ""; // Limpiar opciones anteriores
        options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-btn");
            button.addEventListener("click", function () {
                userMessage(option);
                callback(option);
            });
            optionsBox.appendChild(button);
        });
    }

    // Decidir la carrera según respuestas
    function decidirCarrera() {
        /*
          Lógica simple:  
          - Si le gusta programar => Ingeniería en Sistemas
          - Si le gusta anatomía => Medicina
          - Si le gustan las finanzas => Ciencias Económicas
          - Si le gustan las matemáticas => Ingeniería Civil
          - Si no coincide nada => Administración
        */
        if (userData.gustaProgramar) {
            return "Ingeniería en Sistemas";
        } else if (userData.gustaAnatomia) {
            return "Medicina";
        } else if (userData.gustaFinanzas) {
            return "Ciencias Económicas";
        } else if (userData.gustaMatematicas) {
            return "Ingeniería Civil";
        } else {
            return "Administración de Empresas";
        }
    }

    // Decidir la universidad según presupuesto
    function decidirUniversidad(presupuesto) {
        /*
          - "bajo" => USAC
          - "medio" => UMG
          - "alto" => Del Valle o Francisco Marroquín
        */
        for (let uni in universidades) {
            if (universidades[uni].costo === presupuesto) {
                return uni; // Devuelve la primera coincidencia
            }
        }
        // Si no encontró coincidencia, por defecto USAC
        return "USAC";
    }

    // Controla el flujo de la conversación
    function nextStep() {
        switch (step) {
            case 0:
                botMessage("¡Hola! ¿Cómo te llamas?");
                break;

            case 1:
                botMessage("¿Te gusta programar?");
                showOptions(["Sí", "No"], (respuesta) => {
                    userData.gustaProgramar = (respuesta === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 2:
                botMessage("¿Te interesa la anatomía y la salud?");
                showOptions(["Sí", "No"], (respuesta) => {
                    userData.gustaAnatomia = (respuesta === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 3:
                botMessage("¿Te gustan las finanzas y la contabilidad?");
                showOptions(["Sí", "No"], (respuesta) => {
                    userData.gustaFinanzas = (respuesta === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 4:
                botMessage("¿Te gustan las matemáticas y la lógica?");
                showOptions(["Sí", "No"], (respuesta) => {
                    userData.gustaMatematicas = (respuesta === "Sí");
                    step++;
                    nextStep();
                });
                break;

            case 5:
                // Decidimos la carrera
                userData.carrera = decidirCarrera();
                botMessage(`Parece que podrías encajar bien en la carrera de ${userData.carrera}.`);
                // Preguntamos el presupuesto
                botMessage("¿Cuál es tu presupuesto?");
                showOptions(["Bajo", "Medio", "Alto"], (respuesta) => {
                    userData.presupuesto = respuesta.toLowerCase();
                    step++;
                    nextStep();
                });
                break;

            case 6:
                // Decidimos la universidad
                userData.universidad = decidirUniversidad(userData.presupuesto);
                botMessage(`Según tu presupuesto, te recomendamos la universidad: ${userData.universidad}.`);
                // Preguntamos la jornada
                botMessage("¿Qué jornada prefieres?");
                showOptions(["Matutina", "Vespertina", "Nocturna"], (respuesta) => {
                    userData.jornada = respuesta;
                    step++;
                    nextStep();
                });
                break;

            case 7:
                // Recomendación final
                botMessage(`🎓 ¡Recomendación Final para ${userData.nombre}!
          📍 Universidad: ${userData.universidad}
          📚 Carrera: ${userData.carrera}
          ⏰ Jornada: ${userData.jornada}
          `);
                optionsBox.innerHTML = "";
                break;

            default:
                break;
        }
    }

    // Botón de enviar (para capturar el nombre en el paso 0)
    sendButton.addEventListener("click", function () {
        let inputText = userInput.value.trim();
        if (inputText !== "") {
            userMessage(inputText);
            if (step === 0) {
                userData.nombre = inputText;
                userInput.value = "";
                step++;
                nextStep();
            }
        }
    });

    // Enter en el input (también para capturar el nombre en el paso 0)
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            let inputText = userInput.value.trim();
            if (inputText !== "") {
                userMessage(inputText);
                if (step === 0) {
                    userData.nombre = inputText;
                    userInput.value = "";
                    step++;
                    nextStep();
                }
            }
        }
    });

    // Iniciamos el chatbot
    nextStep();
});
