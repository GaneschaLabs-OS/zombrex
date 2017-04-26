import { views } from './globals';

export default function view (id, fn) {
    views.forEach(function (v) { 
        if (v.id === id) {
            throw new Error(`Id ${id} already defined`);
        }
    });

    views.push({
        id: id,
        fn: fn 
    });
}
