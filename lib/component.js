import { components } from './globals.js';

export default function storeComponents (name, fn) {
    components[name] = fn(components);
}
