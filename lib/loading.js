import { flow, views, components, lazyComponents } from './globals';

export function startphase (fn) {
    flow.before(components);
    
    views.forEach(function (v) { 
        const scope = document.querySelector(v.id);

        return v.fn(scope, components);
    });
    
    return flow.after(components);
}

export function before (fn) {
    flow.before = fn;
    
    Object.keys(lazyComponents).forEach(function (name) { 
        components[name] = lazyComponents[name](components);
    });
}

export function after (fn) {
    flow.after = fn;
}
