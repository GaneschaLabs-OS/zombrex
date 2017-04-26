import storeComponent from './component.js';
import storeData from './storeData.js'
import preload from './preload.js';
import { before, after } from './loading.js';
import view from './view.js';

import { components } from './globals.js';
import zAjax from './zcomponents/zAjax.js';

(function bootStrap () {
    components.zAjax = zAjax;
}());

export default {
    component: storeComponent,
    constant: storeData,
    preload: preload,
    before: before,
    after: after,
    view: view
};    
