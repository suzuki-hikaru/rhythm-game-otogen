// ページが読み込み時に実行
function init() {
    is_login();
    // addUserId();
}

function addUserId() {
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(1);
    });
};

// ログアウト処理
function logout() {
    firebase.auth().signOut().then(function () {
        location.href = '/login';
    }).catch(function (error) {
        console.log(error)
    });
};

// ログインしているか判定
function is_login() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(1);
            console.log('userId: ' + user.uid);
        } else {
            window.location.href = '/login';
        }
    });
}