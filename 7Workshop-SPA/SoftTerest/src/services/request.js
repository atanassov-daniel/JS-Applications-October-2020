export const request = async (url, method, body) => {
    const options = {
        method
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    const data = await response.json();

    return data;
};