import {
    request
} from "./request.js";

const databaseUrl = `https://movies-97242-default-rtdb.firebaseio.com`;

export const addMovie = async (movieData) => {
    let data = await request(`${databaseUrl}/movies/.json`, 'POST', movieData);

    return data.name;
};

export const getAllMovies = async () => {
    let data = await request(`${databaseUrl}/movies/.json`, 'GET');
    // console.log(data);
    return data === null ? null : Object.keys(data).map(key => Object.assign(data[key], {
        key
    }));
};

export const getOneMovie = async (key, currentUserEmail) => { // getting only one movie will be dony only when loading the details page, so all the needed logic can go directly in here
    let data = await request(`${databaseUrl}/movies/${key}.json`, 'GET');

    // let likes = Object.values(data.likes || {});
    // let hasAlreadyLiked = likes.includes(currentUserEmail);

    //! tази логика по-скоро трябва да отиде в самия компонент
    console.log(data);
    return data;
    /* return Object.assign(data, {
        // isCreator: data._creator === currentUserEmail,
        // hasAlreadyLiked,
        // likes,
        // likesCount: likes ? likes.length : 0
    }); */
};

export const deleteMovie = async (key) => {
    let data = await request(`${databaseUrl}/movies/${key}.json`, 'DELETE');

    return data;
};

export const editMovie = async (key, body) => {
    let data = await request(`${databaseUrl}/movies/${key}.json`, 'PATCH', body);

    return data;
};

/* isCreator(movieCreatorEmail, currentUserEmail) {
    // let movieCreator = await request(`${databaseUrl}/movies/${key}.json`, 'GET')._creator;
    // let currentUserEmail = authService.getAuthData().email;
    if (movieCreatorEmail === currentUserEmail) {
        return true;
    }
    return false;
}, */

export const likeMovie = async (key, currentUserEmail) => {
    let data = await request(`${databaseUrl}/movies/${key}/likes/.json`, 'POST', currentUserEmail);

    return data;
};