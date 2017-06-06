export default (function () {
    const query_string = {};
    const query = window.location.search.substring(1);
    const consts = query.split('&');

    for (let i = 0; i < consts.length; i++) {
        const pair = consts[i].split('='); 

        if (typeof query_string[pair[0]] === 'undefined') {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === 'string') {
            const arr = [ query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    return Object.freeze(query_string);
}());