// services.js -> helper function, kоито вършат конкрети неща
// authService -> грижи се за всичко, свързано с автентикацията

//! check if Firebase keeps the loggedIn info even in Mozilla or incognito mode, which would be considered unwanted behavior

//! make sure a logged in user can't open the login/register page
//TODO

const apiKey = 'AIzaSyCiSXptCXdJIMJ4wKN51hRSBB7OGbfnO5A';
const databaseUrl = `https://movies-97242-default-rtdb.firebaseio.com`;

// принципно можем и без тази абстракция за request
const request = async (url, method, body) => {
    let options = {
        method
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
};

const authService = {
    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));
        // .catch(err => console.log(err));

        return data;
    },

    getAuthData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));
            console.log(data);

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                // email: ''
            };
        }

        //! if this doesn't exist in localStorage yet, the page won't load
        //TODO: think of a way to fix it



        /* let data = localStorage.getItem('auth').trim() !== '' ? JSON.parse(localStorage.getItem('auth')) : '';
        console.log(data);
        //! if this doesn't exist in localStorage yet, the page won't load
        //TODO: think of a way to fix it

        return {
            isAuthenticated: data !== '' ? Boolean(data.idToken) : false,
            email: data.email || ''
        }; */
    },

    logout() {
        localStorage.setItem('auth', '');
    },

    async register(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));
        // .catch(err => console.log(err));

        return data;
    }
};

const movieService = {
    async add(movieData) {
        let data = await request(`${databaseUrl}/movies/.json`, 'POST', movieData);

        return data.name;
    },

    async getAll() {
        let data = await request(`${databaseUrl}/movies/.json`, 'GET');

        /* return Object.entries(data).map(entry => ({
            key: entry[0],
            ...entry[1]
        })); */
        // return Object.keys(data).map(key => ({ key, ...data[key] }));
        return Object.keys(data).map(key => Object.assign(data[key], {
            key
        }));
    },

    async getOne(key, currentUserEmail) { // getting only one movie will be dony only when loading the details page, so all the needed logic can go directly in here
        let data = await request(`${databaseUrl}/movies/${key}.json`, 'GET');

        let likes = Object.values(data.likes || {});
        let hasAlreadyLiked = likes.includes(currentUserEmail);

        return Object.assign(data, {
            isCreator: data._creator === currentUserEmail,
            hasAlreadyLiked,
            likesCount: likes ? likes.length : 0
        });
    },

    async deleteMovie(key) {
        let data = await request(`${databaseUrl}/movies/${key}.json`, 'DELETE');

        return data;
    },

    async editMovie(key, body) {
        let data = await request(`${databaseUrl}/movies/${key}.json`, 'PATCH', body);

        return data;
    },

    /* isCreator(movieCreatorEmail, currentUserEmail) {
        // let movieCreator = await request(`${databaseUrl}/movies/${key}.json`, 'GET')._creator;
        // let currentUserEmail = authService.getAuthData().email;
        if (movieCreatorEmail === currentUserEmail) {
            return true;
        }
        return false;
    }, */

    async likeMovie(key, currentUserEmail) {
        let data = await request(`${databaseUrl}/movies/${key}/likes/.json`, 'POST', currentUserEmail);

        return data;
    },

    // hasAlreadyLiked(key, currentUserEmail)
};