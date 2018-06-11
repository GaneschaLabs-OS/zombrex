import { components } from './globals.js';
import { startphase } from './loading.js';
import storeData from './storeData.js'

function fetchAllFn (fn) {
    return fetchAllArray(fn(components));
}

function fetchAllArray (loads) {
    loads.forEach(function (load) {
        components.zAjax(load).then(res => res.json()).then(function (data) {
            storeData(load.name, data);

            if (++counter === loads.length) {
                return startphase();
            }
        }).catch(console.log);
    });
}

function fetchAll (loads) {
    var counter = 0;

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
