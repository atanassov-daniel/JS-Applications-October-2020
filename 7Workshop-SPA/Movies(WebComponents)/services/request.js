export default request = async (url, method, body) => {
    let options = {
        method
    };

    if (body) options.body = JSON.stringify(body);

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
};