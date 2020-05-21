const logLevel = {
    log: true,
};

export default function (prefix = '') {
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
};
