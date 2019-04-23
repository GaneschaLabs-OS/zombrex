function removeAll () {
    window.location.href = window.location.href.split('?')[0];
}

function set (name, value) {
    const exists = get(name);
    const hasParams = window.location.href.includes('?');
    const separator = hasParams ? '?' : '&';

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
    const regexS = '[\\?&]"+name+"=([^&#]*)';
    const regex = new RegExp(regexS);
    const results = regex.exec(url);

    return results == null ? null : results[1];
}

export default {
    removeAll,
    get,
    set
};
