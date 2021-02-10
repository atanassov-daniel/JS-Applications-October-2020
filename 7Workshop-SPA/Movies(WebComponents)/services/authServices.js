export const register = async (email, password) => {
    try {
        let resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return resp.user.email;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        let resp = await firebase.auth().signInWithEmailAndPassword(email, password);
        return resp.user.email;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        let resp = firebase.auth().signOut();
        // console.log(resp);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const getAuthData = () => {
    let currentUser = firebase.auth().currentUser;

    return {
        isAuthenticated: currentUser ? true : false,
        email: currentUser ? currentUser.email : null
    };
};