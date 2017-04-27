import { uninstantComponents } from './globals.js';

export default function storeComponent (name, fn) {
    lazyComponents[name] = fn;
}
