export default function zAjax (load) {
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
