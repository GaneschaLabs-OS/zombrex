import { components } from './globals.js';

function storeCheck (name, obj) {
    if (typeof name !== 'string') {
        throw new Error(`Name ${name} is not typeof string`); 
    }
    if (typeof obj === 'undefined') {
        throw new Error(`obj ${obj} should not be undefined`); 
    }
    
    Object.keys(components).forEach(function (k) { 
        if (k === name) {
            throw new Error(`Name ${name} is already defined`);
        }
    });
}

export default function storeData (name, obj) {
    storeCheck(name, obj);
    components[name] = obj;
}
