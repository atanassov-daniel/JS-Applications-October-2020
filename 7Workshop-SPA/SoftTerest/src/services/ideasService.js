import {
    request
} from "./request.js";

const databaseUrl = `https://softterest-c5d88-default-rtdb.firebaseio.com`;

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

/* export const createIdea = async (ideaData, uid) => {
    let countCreatedIdeas = await request(`${databaseUrl}/users/${uid}/.json`, 'GET');
    await request(`${databaseUrl}/users/${uid}/.json`, 'PUT', (Number(countCreatedIdeas) || 0) + 1);

    let data = await request(`${databaseUrl}/ideas/.json`, 'POST', ideaData);

    return data.name;
}; */
export const createIdea = async (ideaData, uid) => {
    let data = await request(`${databaseUrl}/ideas/.json`, 'POST', ideaData);

    await request(`${databaseUrl}/users/${uid}/.json`, 'POST', ideaData.title);
    // иначе трябваше да паза ключа за идеята и за всяка идея да взимам всичкото инфо, и от него самото име

    return data.name;
};

export const deleteIdea = async (key) => {
    let data = await request(`${databaseUrl}/ideas/${key}.json`, 'DELETE');

    return data;
};

export const getUsersIdeas = async (uid) => {
    const data = await request(`${databaseUrl}/users/${uid}/.json`, 'GET');
    const ideasTitles = Object.values(data || {});

    return {
        ideasCount: ideasTitles.length,
        ideasTitles
    };
};

export const likeIdea = async (key, currentUserEmail) => {
    let data = await request(`${databaseUrl}/ideas/${key}/likes/.json`, 'POST', currentUserEmail);

    return data.name;
};

export const commentIdea = async (key, commenterUsername, comment) => {
    let data = await request(`${databaseUrl}/ideas/${key}/comments/.json`, 'POST', {
        creator: commenterUsername,
        comment
    });

    console.log(key);
    console.log({
        creator: commenterUsername,
        comment
    });

    return data.name;
};