/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const msjStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hello, I can help you calculate the area of a figure. What figure do you want to get its area? Enter your data',
            END_MESSAGE: 'see you later!',
            OPC_MESSAGE: 'Enter the data of the figure',
            HELP_MESSAGE: 'How can I help you?',
            DESIGUAL_MESSAGE: 'Values must be the same.',
            INF_MESSAGE: 'I have no information on this figure.',
            MESSAGE: 'Do you want to try another figure?',
            MESSAGE_2: 'Try again.',
            LS_MESSAGE: 'Sorry, I had trouble doing what you asked. Please try again.'
        }
    },
    mx:{
        translation: {
            WELCOME_MESSAGE: 'Hola, puedo ayudarte a calcular el area de una figura. ¿Qué figura deseas obtener su área? Ingresa sus Datos',
            END_MESSAGE: 'Hasta luego!',
            OPC_MESSAGE: 'Ingrese los datos de la figura',
            HELP_MESSAGE: '¿En que puedo ayudarte?',
            DESIGUAL_MESSAGE: 'Los valores deben ser los mismos.',
            INF_MESSAGE: 'No tengo información sobre esta figura.',
            MESSAGE: '¿Deseas probar con otra figura?',
            MESSAGE_2: 'Intenta de nuevo.',
            LS_MESSAGE: 'Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.'
        }
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AreasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TriRecAreaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intent = handlerInput.requestEnvelope.request.intent;
        const base = intent.slots.b.value;
        const altura = intent.slots.a.value;
        const figura = intent.slots.figura.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const valor1 = intent.slots.valorUno.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const valor2 = intent.slots.valorDos.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        let response,pregunta, area;
        
        if (valor1 === valor2){
            
            if (figura === 'rectangulo' || figura === 'rectángulo' ){
                // Español
                area = base * altura;
                response = "El area del " +figura + " de " + base + ' ' + valor1 + " de base y " + altura + ' ' + valor2 + " de altura son: " + area + ' ' + valor1 +'.';
            }else if(figura === 'triangulo' || figura === 'triángulo'){
                // Español
                area = (base * altura) / 2;
                response = "El area del " +figura + " de " + base + ' ' + valor1 + " de base y " + altura + ' ' + valor2 + " de altura son: " + area + ' ' + valor1 +'.';
            }else if(figura === 'rectangle'){
                // Ingles
                area = base * altura;
                response = "The area of " + figura + ' of '+ base+ ' ' + valor1 + " of base y " + altura + ' ' + valor2 + " of height are: " + area + ' ' + valor1 +'.';
            }else if(figura === 'triangle'){
                // Ingles
                area = (base * altura) / 2;
                response = "The area of " + figura + ' of '+ base+ ' ' + valor1 + " of base y " + altura + ' ' + valor2 + " of height are: " + area + ' ' + valor1 +'.';
            } else {
                response = requestAttributes.t('INF_MESSAGE');
            }
            pregunta = requestAttributes.t('MESSAGE');
            
        }else{
            response = requestAttributes.t('DESIGUAL_MESSAGE');
            pregunta = requestAttributes.t('MESSAGE_2');
        }
            
        return handlerInput.responseBuilder
            .speak(response+ ' ' + pregunta) 
            .reprompt(pregunta)
            .getResponse();
    },
};

const CirIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cirAreaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const intent = handlerInput.requestEnvelope.request.intent;
        const radio = intent.slots.r.value;
        const unidad = intent.slots.unidad.resolutions.resolutionsPerAuthority[0].values[0].value.name;

        let response,pregunta, area;
        
        if(unidad === "centímetro" || unidad === "metros" || unidad === "centímetros" || unidad === "m"){
            area = 3.1416 * (radio*radio);
            response = "El area del circulo con " + radio +' ' + unidad + ' de radio son: '+ area + ' ' + unidad +'.';
        }else if(unidad === "centimeters" || unidad === "meters" ||  unidad === "m."){
            area = 3.1416 * (radio*radio);
            response = "The area of the circle with " + radio +' ' + unidad + ' radio are: '+ area + ' ' + unidad +'.';
        }else{
            response = requestAttributes.t('INF_MESSAGE');
        }
        pregunta = requestAttributes.t('MESSAGE');  
        
        return handlerInput.responseBuilder
            .speak(response+ ' ' + pregunta) 
            .reprompt(pregunta)
            .getResponse();
    },
};


const opcIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'opcIntent';
    },
    handle(handlerInput) {
                const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('OPC_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('END_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('LS_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput){
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const LocalizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'mx',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: msjStrings,
            returnObjects: true
        });
        
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function(...args){
            return LocalizationClient.t(...args);
        }
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
        AreasIntentHandler,
        CirIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();