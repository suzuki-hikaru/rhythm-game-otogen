function getData() {
    // firebaseの設定
    var userId = firebase.auth().currentUser.uid;
    //取得するデータ範囲の設定
    firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var data = snapshot.val();
        for (key in data) {
            var oneCountTime = data[key];
            console.log("firebase:" + oneCountTime.countTimes);
            document.getElementById("test").innerHTML += '<div>' + oneCountTime.title + '：' + oneCountTime.countTimes + '</div>';
        }

        ////////　メモ書き　///////////////////////////////////////////////////////////////
        //データのうちtimesを取得する.'Anonymous'は入力されていないデータ又は匿名データ。
        // var data = (snapshot.val() && snapshot.val().times) || 'Anonymous'; 
        // 指定したリファレンスの全体
        // var data = snapshot.val();
        //ユーザID
        // var data = snapshot.key;
        //keyの名前
        // var data = snapshot.child('countTimes').key;
        // setだけの時
        // var data = snapshot.child('countTimes').val();
        //////////////////////////////////////////////////////////////////////////////////
    });
};