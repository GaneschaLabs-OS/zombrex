import { flow, views, renders, components, lazyComponents } from './globals';

export function startphase (fn) {
    flow.before(components);
    
    Object.keys(lazyComponents).forEach(function (name) { 
        components[name] = lazyComponents[name](components);
    });
    
    renders.forEach(function (r) {
        const scope = document.querySelector(r.id);
        const html = r.fn(components);
        
        if (typeof html !== 'string') {
            throw new Error(`Render Id ${r.id} does not produce any html`);
        }
        
        scope.innerHTML = html
    }); 
    
    views.forEach(function (v) { 
        const scope = document.querySelector(v.id);

        return v.fn(scope, components);
    });
    
    return flow.after(components);
}

export function before (fn) {
    flow.before = fn;
}

export function after (fn) {
    flow.after = fn;
}
