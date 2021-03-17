export class Logger{

    static info(...args){
        console.info((new Date()).toLocaleString(), ...args);
    }

    static warn(...args){
        console.warn(...args);
    }

}