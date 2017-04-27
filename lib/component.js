import { lazyComponents } from './globals.js';

function storeCheck (name, fn) {
    if (typeof name !== 'string') {
        throw new Error(`Name ${name} is not typeof string`); 
    }
    if (typeof fn !== 'function') {
        throw new Error(`fn ${fn} should be a function`); 
    }
}

export default function storeComponent (name, fn) {
    storeCheck(name, fn);
    lazyComponents[name] = fn;
}
