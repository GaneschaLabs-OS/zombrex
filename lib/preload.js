import { components } from './globals.js';
import { startphase } from './loading.js';
import storeData from './storeData.js'

function start () {
    window.addEventListener('DOMContentLoaded', function () {
        return startphase();
    }, true);
}

export default function preload (loads) {    
    var counter = 0;

    if (loads.length ===  0) {
        return startphase();
    }

    loads.forEach(function (load) {
        components.zAjax(load).then(function (response) {
            storeData(load.name, response.data);
            counter++;
            
            if (loads.length === counter) {
                return start();
            }
        });
    });
}
