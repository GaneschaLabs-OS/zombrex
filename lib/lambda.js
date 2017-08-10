import { views } from './globals';

export default function lambda (fn) {
    if (typeof fn !== 'function') {
        throw new Error(`lambda ${fn} is not typeof function`); 
    }
    
    lambda.push(fn);
}
