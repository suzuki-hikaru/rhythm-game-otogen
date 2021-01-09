function getData() {
    // inform: テーブルの削除　＊粗雑
    var Table = document.getElementById("table");
    Table.innerHTML = "";

    //取得するデータ範囲の設定
    firebase.database().ref('/users/').once('value').then(function (snapshot) {
        var allData = snapshot.val();
        const th = '<tr id="th">\n<th>Youtubeタイトル</th><th>ファイル名</th><th>作成者</th><th>いいね数</th><th>jump</th>\n</tr>';
        document.getElementById('table').insertAdjacentHTML('afterbegin', th);
        //繰り返してタイトルを取得。多分推奨のやり方ではない
        for (oneUserId in allData) {
            var oneUser = allData[oneUserId];
            for (oneDocKey in oneUser) {
                const tr = `<tr>\n<form action="/playMode method="POST" enctype="multipart/form-data"><td>${allData[oneUserId][oneDocKey].yt_title}</td><td>${allData[oneUserId][oneDocKey].title}</td><td>${allData[oneUserId][oneDocKey].userName}</td><td>${allData[oneUserId][oneDocKey].good}</td><td><button onclick="jump('${oneDocKey}');">jump</button></td></form>\n</tr>`;
                document.getElementById('th').insertAdjacentHTML('afterend', tr);
            };
        };
    });
};

function getTitleData() {
    // inform: テーブルの削除　＊粗雑
    const Table = document.getElementById("table");
    Table.innerHTML = "";
    // formからの取得データ
    const titledata = document.getElementById("searchTitle").value;
    //取得するデータ範囲の設定
    firebase.database().ref('/users/').once('value').then(function (snapshot) {
        var allData = snapshot.val();
        const th = '<tr id="th">\n<th>Youtubeタイトル</th><th>ファイル名</th><th>作成者</th><th>いいね数</th><th>jump</th>\n</tr>';
        document.getElementById('table').insertAdjacentHTML('afterbegin', th);

        //繰り返してタイトルを取得。多分推奨のやり方ではない
        for (oneUserId in allData) {
            var oneUser = allData[oneUserId];
            for (oneDocKey in oneUser) {
                if (allData[oneUserId][oneDocKey].title.indexOf(titledata) > -1 || allData[oneUserId][oneDocKey].yt_title.indexOf(titledata) > -1) {
                    // 部分一致のときの処理
                    const tr = `<tr>\n<form action="/playMode method="POST" enctype="multipart/form-data"><td>${allData[oneUserId][oneDocKey].yt_title}</td><td>${allData[oneUserId][oneDocKey].title}</td><td>${allData[oneUserId][oneDocKey].userName}</td><td>${allData[oneUserId][oneDocKey].good}</td><td><button onclick="jump('${oneDocKey}');">jump</button></td></form>\n</tr>`;
                    document.getElementById('th').insertAdjacentHTML('afterend', tr);
                }
            };
        };
    });
};

function getURLData() {
    // inform: テーブルの削除　＊粗雑
    const Table = document.getElementById("table");
    Table.innerHTML = "";

    // formからの取得データ
    const urldata = document.getElementById("searchURL").value;
    //取得するデータ範囲の設定
    firebase.database().ref('/users/').once('value').then(function (snapshot) {
        var allData = snapshot.val();
        const th = '<tr id="th">\n<th>Youtubeタイトル</th><th>ファイル名</th><th>作成者</th><th>いいね数</th><th>jump</th>\n</tr>';
        document.getElementById('table').insertAdjacentHTML('afterbegin', th);

        //繰り返してタイトルを取得。多分推奨のやり方ではない
        for (oneUserId in allData) {
            var oneUser = allData[oneUserId];
            for (oneDocKey in oneUser) {
                if (urldata == allData[oneUserId][oneDocKey].url) {
                    const tr = `<tr>\n<form action="/playMode method="POST" enctype="multipart/form-data"><td>${allData[oneUserId][oneDocKey].yt_title}</td><td>${allData[oneUserId][oneDocKey].title}</td><td>${allData[oneUserId][oneDocKey].userName}</td><td>${allData[oneUserId][oneDocKey].good}</td><td><button onclick="jump('${oneDocKey}');">jump</button></td></form>\n</tr>`;
                    document.getElementById('th').insertAdjacentHTML('afterend', tr);
                }
            };
        };
    });
};

function jump(insertObject) {
    document.getElementById("play").value = insertObject;
    document.getElementById("play").style.backgroundColor = "yellow";
    document.getElementById("info").innerHTML = "<p>＊docKeyが挿入されました。</p>";
}