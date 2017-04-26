import { components } from './globals.js';

export default storeComponents function (name, fn) {
    components[name] = fn(components);
}
