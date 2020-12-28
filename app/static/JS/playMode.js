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
        enemy = new Enemy();
        document.body.appendChild(enemy.image);
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
    updateVal = setInterval('update_list();', 10);
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