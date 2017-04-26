export default function zAjax (load) {
    const { url, data } = load;
    const ajax = !data ? axios.get : axios.post;
    
    return ajax(url, data);
}