import { components } from './globals.js';

export default function storeComponent (name, fn) {
    uninstantComponents[name] = fn;
}
