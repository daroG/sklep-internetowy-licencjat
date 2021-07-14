export class Logger{

    static info(...args){
        console.info((new Date()).toLocaleString(), ...args);
    }

    static warn(...args){
        console.warn((new Date()).toLocaleString(), ...args);
    }

    static error(...args){
        console.error((new Date()).toLocaleString(), ...args);
    }

}