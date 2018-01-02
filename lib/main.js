import storeComponent from './component.js';
import storeData from './storeData.js'
import preload from './preload.js';
import { before, after } from './loading.js';
import view from './view.js';
import render from './render.js';
import lambda from './lambda.js';

import { components } from './globals.js';
import zAjax from './zcomponents/zAjax.js';
import zBROWSER from './zcomponents/zBROWSER.js';
import zURLPARAM from './zcomponents/zURLPARAM.js';
import tabReload from './zcomponents/tabReload.js';

(function bootStrap () {
    storeData('zURLPARAM', zURLPARAM);
    storeData('zBROWSER', zBROWSER);
    storeData('tabReload', tabReload);        
    storeData('noop', function () {});
        
    components.zAjax = zAjax;
}());

export default {
    component: storeComponent,
    constant: storeData,
    preload: preload,
    before: before,
    render: render,
    lambda: lambda,
    after: after,
    view: view
};    
