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

/* else if (path.startsWith('/details')) {
    let id = path.replace('/details/', '');
    if (path.includes('/edit')) {
        id = id.replace('/edit/', '').replace('/edit', '');
        path = '/edit';
    } else {
        path = '/details';
    }

    let movieData = await shoeService.getOne(id);

    templateData = {
        ...templateData,
        ...movieData,
        isCreator: movieData._creator === authService.getAuthData().email
    };
    console.log(templateData);
} */