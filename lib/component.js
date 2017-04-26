import { components } from './globals.js';

export default function storeComponent (name, fn) {
    components[name] = fn(components);
}
