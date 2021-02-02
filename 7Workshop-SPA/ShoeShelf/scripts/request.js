export const request = async (url, method, body) => {
    let options = {
        method,
    };
    
    if (body) options.body = JSON.stringify(body);

    let response = await fetch(url, options);

    let data = await response.json();

    // if(data.error) return Promise.reject()

    return data;
};