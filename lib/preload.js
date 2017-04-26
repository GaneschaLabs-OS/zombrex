import { components } from './globals.js';
import { startphase } from './loading.js';
import storeComponent from './storeComponents.js';

function fetchAll (loads) {
    var counter = 0;

    loads.forEach(function (load) {
        components.zAjax(load).then(function (response) {
            components(load.name, response.data);
            counter++;
            
            if (loads.length === counter) {
                return startphase();
            }
        });
    });

    if (loads.length ===  0) {
        return startphase();
    }
}

export default function preload (loads) {
    window.addEventListener('DOMContentLoaded', function () {
        return fetchAll(loads);
    }, true);
}
