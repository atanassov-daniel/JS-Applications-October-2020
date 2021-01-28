const authService = {
    getAuthData() {
        let currentUser = firebase.auth().currentUser;

        return {
            isAuthenticated: currentUser ? true : false,
            email: currentUser ? currentUser.email : null
        };
    },
};

export {
    authService
};