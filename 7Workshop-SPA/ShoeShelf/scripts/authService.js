export const authService = {
    getAuthData() {
        let currentUser = firebase.auth().currentUser;

        return {
            isAuthenticated: currentUser ? true : false,
            email: currentUser ? currentUser.email : null
        };
    },
    
    /* async signUp(email, password) {
        let userEmail;
        let err;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userEmail = userCredential.email;
            })
            .catch((error) => {
                err = error;
            });

        // if (err) return Promise.reject(err);
        if (err) return err;
        // else return Promise.resolve(userEmail);
        else return userEmail;
    }, */
};