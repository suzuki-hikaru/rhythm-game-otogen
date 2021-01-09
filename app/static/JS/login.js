const ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: './',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        },
        // {
        //     provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // },
    ]
};

ui.start('#firebaseui-auth-container', uiConfig);