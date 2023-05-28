/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
    javascript: [
        "Es un lenguaje usado principalmente para el desarrollo web",
        "Es un lenguaje dinamico",
        "Esta basado en prototipos",
    ],
    python: [
        "Python es un lenguaje de programación interpretado de alto nivel conocido por su simplicidad y legibilidad.",
        "Python admite múltiples paradigmas de programación, incluida la programación procedimental, orientada a objetos y funcional.",
        "Python admite escritura dinámica, lo que significa que las variables pueden contener valores de diferentes tipos durante el tiempo de ejecución.",
    ],
    java: [
        "Java es un popular lenguaje de programación de propósito general conocido por sus características de portabilidad, escalabilidad y seguridad.",
        'Java sigue el principio de "escribir una vez, ejecutar en cualquier lugar", lo que permite que los programas se ejecuten en cualquier plataforma con una máquina virtual Java (JVM).',
        "Java es un lenguaje orientado a objetos, que enfatiza el uso de clases y objetos para estructurar programas.",
    ],
    ruby: [
        "Ruby es un lenguaje de programación dinámico y orientado a objetos conocido por su simplicidad, expresividad y sintaxis amigable para los desarrolladores.",
        'Ruby enfatiza el principio de "menor sorpresa", con el objetivo de proporcionar un código intuitivo y legible que se comporte como se espera.',
        "La sintaxis de Ruby es elegante y fácil de leer, utilizando una sintaxis limpia y concisa con una cantidad mínima de puntuación.",
    ],
    rust: [
        "Rust es un lenguaje de programación de sistemas desarrollado por Mozilla que se centra en la seguridad, la concurrencia y el rendimiento.",
        "Rust admite abstracciones de costo cero, lo que permite a los desarrolladores escribir código de alto nivel sin sacrificar el rendimiento.",
        "Rust proporciona primitivas de concurrencia integradas, como subprocesos y canales de paso de mensajes, y garantiza la seguridad de los subprocesos a través de su modelo de propiedad y préstamo.",
    ],
    typescript: [
        "TypeScript es un superconjunto de JavaScript tipificado estáticamente que se compila en JavaScript simple.",
        "TypeScript proporciona una experiencia de herramientas más sólida, que incluye finalización de código, inferencia de tipos y soporte de refactorización en entornos de desarrollo integrado (IDE) modernos.",
        "TypeScript es compatible con las funciones y la sintaxis de JavaScript más recientes y, al mismo tiempo, presenta sus propias funciones, como interfaces, enumeraciones y genéricos.",
    ],
    swift: [
        "Swift es un lenguaje de programación moderno de código abierto desarrollado por Apple para el desarrollo de aplicaciones iOS, macOS, watchOS y tvOS.",
        "Swift tiene tipos estáticos, lo que significa que las variables y las expresiones tienen un tipo específico que se verifica en el momento de la compilación, lo que reduce la probabilidad de errores en el tiempo de ejecución.",
        "Swift es compatible con los paradigmas de programación modernos, incluida la programación funcional, procedimental y orientada a objetos.",
    ],
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola,puedo darte datos curiosos de algún lenguaje de programación, di algo como "prueba python"';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CustomLanguageIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLenguajesIntent'
    );
  },
  handle(handlerInput) {
    const { language } = handlerInput.requestEnvelope.request.intent.slots;
    let response;
    let pregunta;
    if (language && languageFacts[language.value]) {
      response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)];
      pregunta = '¿Deseas realizar otra solicitud?';
    } else {
      response = "No tengo información sobre el lenguaje que has mencionado";
      pregunta = '¿Deseas realizar otra solicitud?';
    }

    return handlerInput.responseBuilder
      .speak(response + ' ' + pregunta)
      .reprompt(pregunta)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedo darte datos curiosos de algún lenguaje de programación, di algo como "prueba python';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Que las buenas practicas te acompañen y que tengas buen código, Hasta luego!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento, no sé nada de eso. Inténtalo de nuevo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();