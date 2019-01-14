import { flow, views, renders, components, lazyComponents, lambdas } from './globals';

// this function handles the execution flow
export function startphase (fn) {
    flow.before(components);

    Object.keys(lazyComponents).forEach(name => components[name] = lazyComponents[name]);
    Object.keys(lazyComponents).forEach(name => components[name] = components[name](components));
           
    renders.forEach(function (r) {
        const scope = document.querySelector(r.id);
        const html = r.fn(components);
        
        if (typeof html !== 'string') {
            throw new Error(`Render Id ${r.id} does not produce any html`);
        }
        
        scope.innerHTML = html.replace(new RegExp('\n', 'g'), '');
    }); 
    
    views.forEach(function (v) { 
        const scope = document.querySelector(v.id);

        return v.fn(scope, components);
    });
    
    lambdas.forEach(fn => fn(components));
    
    return flow.after(components);
}

export function before (fn) {
    flow.before = fn;
}

export function after (fn) {
    flow.after = fn;
}
