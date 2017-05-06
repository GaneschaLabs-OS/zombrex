import { renders } from './globals';

export default function render (id, fn) {
    renders.forEach(function (v) { 
        if (v.id === id) {
            throw new Error(`Id ${id} already defined in renders`);
        }
    });

    renders.push({
        id: id,
        fn: fn 
    });
}
