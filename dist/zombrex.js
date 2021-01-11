const zombrex = (function () {
    'use strict';

    function noop () {}

    const components = { zSHARE: {} };
    const views = [];
    const renders = [];
    const lambdas = [];
    const flow = { after: noop, before: noop };
    const lazyComponents = {};

    function storeCheck (name, fn) {
        if (typeof name !== 'string') {
            throw new Error(`Name ${name} is not typeof string`); 
        }
        if (typeof fn !== 'function') {
            throw new Error(`fn ${fn} should be a function`); 
        }
    }

    function storeComponent (name, fn) {
        storeCheck(name, fn);
        lazyComponents[name] = fn;
    }

    function storeCheck$1 (name, obj) {
        if (typeof name !== 'string') {
            throw new Error(`Name ${name} is not typeof string`); 
        }
        if (typeof obj === 'undefined') {
            throw new Error(`Name ${name} -> obj ${obj} should not be undefined`); 
        }
        
        Object.keys(components).forEach(function (k) { 
            if (k === name) {
                throw new Error(`Name ${name} is already defined`);
            }
        });
    }

    function storeData (name, obj) {
        storeCheck$1(name, obj);
        components[name] = obj;
    }

    // this function handles the execution flow
    function startphase (fn) {
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

    function before (fn) {
        flow.before = fn;
    }

    function after (fn) {
        flow.after = fn;
    }

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

    function preload (loads) {
        window.addEventListener('DOMContentLoaded', () => fetchAll(loads), true);
    }

    function view (id, fn) {
        views.forEach(function (v) { 
            if (v.id === id) {
                throw new Error(`Id ${id} already defined`);
            }
        });

        views.push({ id, fn });
    }

    function render (id, fn) {
        renders.forEach(function (v) { 
            if (v.id === id) {
                throw new Error(`Id ${id} already defined in renders`);
            }
        });

        renders.push({ id, fn });
    }

    function lambda (fn) {
        if (typeof fn !== 'function') {
            throw new Error(`lambda ${fn} is not typeof function`); 
        }
        
        lambdas.push(fn);
    }

    function removeAll () {
        window.location.href = window.location.href.split('?')[0];
    }

    function set (name, value) {
        const exists = get(name);
        const hasParams = window.location.href.includes('?');
        const separator = hasParams ? '&' : '?';

        if (!exists) {
            window.location.href += `${separator}${name}=${value}`;
            return;
        }
        if (exists && exists === value) {
            return;
        }
        if (exists && exists !== value) {
            return window.location.href = window.location.href.replace(`${name}=${exists}`, `${name}=${value}`);
        }
    }

    function get (name, url = window.location.href) {
        if (!url) {
            url = location.href;
        }

        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        const regexS = '[\\?&]' + name + '=([^&#]*)';
        const regex = new RegExp(regexS);
        const results = regex.exec(url);

        return results == null ? null : results[1];
    }

    const zURLPARAM = {
        removeAll,
        get,
        set
    };

    function tabReload () {
        return window.location.reload()
    }

    const logLevel = {
        log: true,
    };

    function debug (prefix = '') {
        return {
            deactivate (setup) {
                setup.forEach(s => logLevel[s] = false);
                Object.freeze(logLevel);
            },
            arrow () {
                if (logLevel.log) {
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                }
                return this;
            },
            always (text) {
                console.log(`${prefix} -> ${text}`);
                return this;
            },
            object (obj) {
                if (logLevel.log) {
                    console.log(`${prefix} ->`);
                    console.log(obj);
                }
                return this;
            },
            log (text) {
                if (logLevel.log) {
                    console.log(`${prefix} -> ${text}`);
                }
                return this;
            }
        };
    }

    (function bootStrap () {
        storeData('debug', debug);
        storeData('zURLPARAM', zURLPARAM);
        storeData('tabReload', tabReload);        
        storeData('noop', function () {});
    }());

    const main = {
        component: storeComponent,
        constant: storeData,
        preload: preload,
        before: before,
        render: render,
        lambda: lambda,
        after: after,
        view: view
    };

    return main;

}());
