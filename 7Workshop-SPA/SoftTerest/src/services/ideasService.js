import {
    request
} from "./request.js";

const databaseUrl = `https://softterest-c5d88-default-rtdb.firebaseio.com/`;

export const getAllIdeas = async () => {
    let data = await request(`${databaseUrl}/ideas/.json`, 'GET');
    
    return data === null ? null : Object.keys(data).map(key => Object.assign(data[key], {
        key
    }));
};

export const getOneIdea = async (key) => {
    let data = await request(`${databaseUrl}/ideas/${key}.json`, 'GET');

    return data;
};

export const createIdea = async (ideaData) => {
    let data = await request(`${databaseUrl}/ideas/.json`, 'POST', ideaData);

    return data.name;
};

export const updateIdea = async (key, ideaData) => {
    let data = await request(`${databaseUrl}/ideas/${key}.json`, 'PATCH', ideaData);

    return data;
};

export const deleteIdea = async (key) => {
    let data = await request(`${databaseUrl}/ideas/${key}.json`, 'DELETE');

    return data;
};

/* export const likeIdea = async (key, currentUserEmail) => {
    let data = await request(`${databaseUrl}/ideas/${key}/likes/.json`, 'POST', currentUserEmail);

    return data;
};

export const commentIdea = async (key, currentUserEmail) => {
    let data = await request(`${databaseUrl}/ideas/${key}/likes/.json`, 'POST', currentUserEmail);

    return data;
}; */