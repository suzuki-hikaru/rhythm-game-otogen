/////////　カウント処理/////////
let count = 0;
var i = 0;
let countupVal;
var score = 0;

let countup = function () {
    count++;
    if (count == searchedArray[0][i]) {
        i = i + 1;
        console.log("どん！　" + count);
    } else {
        console.log(count);
    };
};

///////////　ゲームコントローラー　//////////
var pushArray = [];

function startGame() {
    player.playVideo();
    count = 0;
    i = 0;
    countupVal = setInterval('countup();', 1000);
    //// error: 二回目を押すとカウントが早くなる ///////
};

function stopGame() {
    player.stopVideo();
    clearInterval(countupVal);
};

function appendCount() {
    var result = searchedArray[0].indexOf(count);
    if (result == -1) {
        console.log("ポン！　×　" + count);
    } else {
        console.log("ポン！　○　" + count);
    };
};

//////////　ゲームui　//////////
let GameObject = function () { // GameObject のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "fixed";
}

let PlayBar = function () { // PlayBar のコンストラクタ関数
    GameObject.apply(this, arguments);
    this.x = 0;
    this.y = 0;
    this.image.src = "/static/images/taiko.png";
}

let CountBall = function () { // CountBall のコンストラクタ関数
    GameObject.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = 0;
    this.dy = 1;
    this.image.src = "/static/images/taiko.png";
}

PlayBar.prototype = new GameObject;
CountBall.prototype = new GameObject;

CountBall.prototype.update = function () {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if (this.x < 0 || this.x > window.innerWidth - this.image.width) {
        this.x = this.x - this.dx;
        this.dx *= -1;
    }
    if (this.y < 0 || this.y > window.innerHeight - this.image.height) {
        this.y = this.y - this.dy;
        this.dy *= -1;
    }
    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";
    if ((Math.abs(PlayBar.x - this.x) < PlayBar.image.width) && (Math.abs(PlayBar.y - this.y) < PlayBar.image.height)) {
        // gameover();
    }
}

let playBar;
let countball = new Array(5);

function gameView() {　// ブラウザにコンテンツがロードされたときに1度だけ呼ばれる関数
    playBar = new PlayBar();

    for (let i = 0; i < countball.length; i++) {
        countball[i] = new CountBall();
    }
    document.body.appendChild(PlayBar.image);

    for (let i = 0; i < countball.length; i++) {
        document.body.appendChild(countball[i].image);
    }

    // マウスが移動したときに MouseMove 関数が呼ばれるようにイベントリスナを設定
    if (document.addEventListener) {
        document.addEventListener("mousemove", MouseMove);
    } else if (document.attachEvent) {
        document.attachEvent("onmousemove", MouseMove);
    }
}

function MouseMove(e) {
    PlayBar.x = (e.clientX - PlayBar.image.width / 2);
    PlayBar.y = (e.clientY - PlayBar.image.height / 2);
    PlayBar.image.style.left = PlayBar.x + "px";
    PlayBar.image.style.top = PlayBar.y + "px";
}

let update = function () { // 画像表示のアップデート
    // for (let i = 0; i < countball.length; i++) {
    //     countball[i].update();
    // }
}

// updateVal = setInterval(update, 10); // 関数updateを10msごとに呼び出す．

// function gameover() {
//     clearInterval(countupVal); // 関数countupを一定時間ごとに呼び出していたのを止める．
//     clearInterval(updateVal); // 関数updateを一定時間ごとに呼び出していたのを止める．
// }

