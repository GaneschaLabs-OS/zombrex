var zombrex = (function () {
'use strict';

function noop() {}

var components = { zSHARE: {} };
var views = [];
var flow = { after: noop, before: noop };
var lazyComponents = {};

function storeCheck(name, fn) {
    if (typeof name !== 'string') {
        throw new Error('Name ' + name + ' is not typeof string');
    }
    if (typeof fn !== 'function') {
        throw new Error('fn ' + fn + ' should be a function');
    }
}

function storeComponent(name, fn) {
    storeCheck(name, fn);
    lazyComponents[name] = fn;
}

function storeCheck$1(name, obj) {
    if (typeof name !== 'string') {
        throw new Error('Name ' + name + ' is not typeof string');
    }
    if (typeof obj === 'undefined') {
        throw new Error('obj ' + obj + ' should not be undefined');
    }

    Object.keys(components).forEach(function (k) {
        if (k === name) {
            throw new Error('Name ' + name + ' is already defined');
        }
    });
}

function storeData(name, obj) {
    storeCheck$1(name, obj);
    components[name] = obj;
}

function startphase(fn) {
    flow.before(components);

    Object.keys(lazyComponents).forEach(function (name) {
        components[name] = lazyComponents[name](components);
    });

    views.forEach(function (v) {
        var scope = document.querySelector(v.id);

        return v.fn(scope, components);
    });

    return flow.after(components);
}

function before(fn) {
    flow.before = fn;
}

function after(fn) {
    flow.after = fn;
}

function fetchAll(loads) {
    var counter = 0;

    if (loads.length === 0) {
        return startphase();
    }

    loads.forEach(function (load) {
        components.zAjax(load).then(function (response) {
            storeData(load.name, response.data);
            counter++;

            if (loads.length === counter) {
                return startphase();
            }
        });
    });
}

function preload(loads) {
    window.addEventListener('DOMContentLoaded', function () {
        return fetchAll(loads);
    }, true);
}

function view(id, fn) {
    views.forEach(function (v) {
        if (v.id === id) {
            throw new Error('Id ' + id + ' already defined');
        }
    });

    views.push({
        id: id,
        fn: fn
    });
}

function zAjax(load) {
    var url = load.url,
        data = load.data;

    var ajax = !data ? axios.get : axios.post;

    return ajax(url, data);
}

var zBROWSER$1 = zBROWSER = {
   languageLong: window.navigator.userLanguage || window.navigator.language,
   language: (window.navigator.userLanguage || window.navigator.language).substring(0, 2),
   agent: navigator.userAgent,
   online: navigator.onLine,
   timeFormat: new Date().getTimezoneOffset()
};

(function bootStrap() {
    storeData('zBROWSER', zBROWSER$1);
    components.zAjax = zAjax;
})();

var main = {
    component: storeComponent,
    constant: storeData,
    preload: preload,
    before: before,
    after: after,
    view: view
};

return main;

}());
