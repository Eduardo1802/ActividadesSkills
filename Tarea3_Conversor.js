/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');


const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Hello, I can help you to do conversions. What do you want to transform?',
            END_MESSAGE: 'see you later!',
            OPC_MESSAGE: 'Enter your conversion',
            HELP_MESSAGE: 'How can I help you?',
            ATR_MESSAGE: 'I have no information about the mentioned conversion.',
            PRE_MESSAGE: 'Do you want to do another conversion?',
            CON_MESSAGE: 'Would you like to try another conversion?',
            VAR_MESAGE: 'Some variables are empty or wrong.',
            CERO_MESSAGE: 'Value must be greater than zero or not null'
        }
    },
    mx:{
        translation: {
            WELCOME_MESSAGE: 'Hola, puedo ayudarte a hacer conversiones. ¿Qué quieres transformar?',
            END_MESSAGE: 'Hasta luego!',
            OPC_MESSAGE: 'Ingrese su conversión',
            HELP_MESSAGE: '¿En que puedo ayudarte?',
            ATR_MESSAGE: 'No tengo información sobre la conversión mencionada.',
            PRE_MESSAGE: '¿Deseas hacer otra conversión?',
            CON_MESSAGE: '¿Deseas probar con otra conversión?',
            VAR_MESAGE: 'Algunas variables están vacías o erroneas.',
            CERO_MESSAGE: "El valor debe ser mayor a cero o no nulo."
        }
    }
}
const ConversorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'conversorIntent';
    },
    handle(handlerInput) {
        const { attributesManager} = handlerInput;
        const requestAtributes = attributesManager.getRequestAttributes();
        const intent = handlerInput.requestEnvelope.request.intent;
        const valor = intent.slots.valor.value;
        const tipo = intent.slots.tipo.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        const tipoDos = intent.slots.DosTipo.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        let response,pregunta;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        
        
        if(valor <= 0 || isEmpty(valor)){
            response = requestAttributes.t('CERO_MESSAGE');
            pregunta = requestAttributes.t('CON_MESSAGE');
        }else if (isEmpty(tipo) || isEmpty(tipoDos)) {
            response = requestAttributes.t('VAR_MESAGE');
            pregunta = requestAttributes.t('CON_MESSAGE')
        } else if ((tipo === "centimetros" || tipo === "centimeters") || (tipoDos === "pulgadas" || tipoDos === "inches")){
            if(tipo === "centimetros" && tipoDos === "pulgadas" ){
                response = valor + " centimetros son " + valor * 2.54 + " pulgadas.";
                pregunta = '¿Deseas hacer otra conversión?';
            }else{
                response = valor + " centimeters are " + valor * 2.54 + " inches.";
                pregunta = 'Do you want to perform another conversion?';
            }
            
        } else if ((tipo === "yardas" || tipo === "yards") || (tipoDos === "metros" || tipoDos === "meters")) {
            if(tipo === "yardas" && tipoDos === "metros" ){
                response =  valor + " yardas son " + valor * 0.9144 + " metros.";
                pregunta = '¿Deseas hacer otra conversión?';
            }else{
                response = valor + " yards are " + valor * 0.9144 + " meters.";
                pregunta = 'Do you want to perform another conversion?';
            }    
            
        } else if ((tipo === "litros" || tipo === "liters") || (tipoDos === "galones" || tipoDos === "gallons")){
            const resultado = (valor * 0.264172).toFixed(4);
            if(tipo === "litros" && tipoDos === "galones" ){
                response = valor + " litros son " + resultado + " galones.";
                pregunta = '¿Deseas hacer otra conversión?';
            }else{
                response = valor + " liters are " + resultado + " gallons.";
                pregunta = 'Do you want to perform another conversion?';
            }
            
        } else if ((tipo === "kilogramos" || tipo === "kilograms") || (tipoDos === "libras" || tipoDos === "pounds")) {
            const resultado = (valor * 2.20462).toFixed(4);
            if(tipo === "kilogramos" && tipoDos === "libras" ){
                response = valor + " kilogramos son " + resultado + " libras.";
                pregunta = '¿Deseas hacer otra conversión?';
            }else{
                response = valor + " kilograms are " + resultado + " pounds.";
                pregunta = 'Do you want to perform another conversion?';
                
            }
            
        }else if ((tipo === "kilometros" || tipo === "kilometres") || (tipoDos === "metros" || tipoDos === "meters")){
            if(tipo === "kilometros" && tipoDos === "metros" ){
                response = valor + " kilometros son " + valor * 1000 + " metros.";
                pregunta = '¿Deseas hacer otra conversión?';
            }else{
                response = valor + " kilometres are " + valor * 1000 + " meters.";
                pregunta = 'Do you want to perform another conversion?';
            }
            
        }else{
           response = requestAttributes.t('ATR_MESSAGE');
           pregunta = requestAttributes.t('PRE_MESSAGE');
        }
        
        return handlerInput.responseBuilder
            .speak(response + ' ' + pregunta)
            .reprompt(pregunta)
            .getResponse();
    },
};

function isEmpty(value) {
    return value === undefined || value === null || value === "";
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

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
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
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

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
        let response,pregunta;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        response = requestAttributes.t('ATR_MESSAGE');
        pregunta = requestAttributes.t('PRE_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(response + ' ' + pregunta)
            .reprompt(pregunta)
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
            resources: languageStrings,
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
        opcIntentHandler,
        ConversorIntentHandler,
        HelloWorldIntentHandler,
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