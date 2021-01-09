function init() {
    loginCheck();
}

function loginCheck() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("login success!!");
            console.log('your userId: ' + user.uid);
        } else {
            window.location.href = '/login';
        }
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        location.href = '/login';
    }).catch(function (error) {
        console.log(error)
    });
};
