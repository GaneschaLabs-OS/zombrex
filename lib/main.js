import storeComponent from './component.js';
import storeData from './storeData.js'
import preload from './preload.js';
import { before, after } from './loading.js';
import view from './view.js';
import render from './render.js';

import { components } from './globals.js';
import zAjax from './zcomponents/zAjax.js';
import zBROWSER from './zcomponents/zBROWSER.js';
import zURLPARAM from './zcomponents/zURLPARAM.js';

(function bootStrap () {
    storeData('zBROWSER', zBROWSER);   
    components.zAjax = zAjax;
    components.zURLPARAM = zURLPARAM;
}());

export default {
    component: storeComponent,
    constant: storeData,
    preload: preload,
    before: before,
    render: render,
    after: after,
    view: view
};    
