const logLevel = {
    log: true,
};

export default {
    configure (setup) {
        setup.forEach(s => logLevel[s] = false);
        Object.freeze(logLevel);
    },
    arrow () {
        if (logLevel.log) {
            console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
        }
        return this;
    },
    always (text) {
        console.log(text);
        return this;
    },
    log (text) {
        if (logLevel.log) {
            console.log(text);
        }
        return this;
    }
};
