import { components } from './globals.js';
import { startphase } from './loading.js';
import storeData from './storeData.js'

function fetchAllFn (fn) {
    return fetchAllArray(fn(components));
}

function getFetch (load) {
    const { url, data } = load;
    const body = data ? {
        method: 'POST',
        headers: { 'content-type': 'application/json' },             
        mode: 'cors',
        body: JSON.stringify(data),
        credentials: 'same-origin' 
    } : {
        method: 'GET',
        headers: { 'content-type': 'application/json' },             
        mode: 'cors',
        credentials: 'same-origin' 
    }; 

    return fetch(url, body);
}

function fetchAllArray (loads) {
    var counter = 0; 

    if (loads.length === 0) {
        return startphase();
    }

    loads.forEach(function (load) {
        getFetch(load).then(res => res.json()).then(function (data) {
            storeData(load.name, data);

            if (++counter === loads.length) {
                return startphase();
            }
        }).catch(console.log);
    });
}

function fetchAll (loads) {
    if (loads.length === 0 || typeof loads === 'undefined') {
        return startphase();
    }

    if (typeof loads === 'function') {
        return fetchAllFn(loads);
    }

    return fetchAllArray(loads);
}

export default function preload (loads) {
    window.addEventListener('DOMContentLoaded', () => fetchAll(loads), true);
}
