/////////　カウント処理/////////
let count = 0;
var i = 0;
let countupVal;
let combo = 0;
var trueScore = 0;
var falseScore = 0;


let countup = function () {
    count++;
    if ((count + 23) == searchedArray[0][i]) {
        i = i + 1;
        console.log("どん！　" + count);
        ge();
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
    countupVal = setInterval('countup();', 100);
    //// error: 二回目を押すとカウントが早くなる ///////
};

function stopGame() {
    player.stopVideo();
    clearInterval(countupVal);
};

function appendCount() {
    var result = searchedArray[0].indexOf(count);
    var range = searchedArray[0].indexOf(count + 1);
    var range2 = searchedArray[0].indexOf(count - 1);

    if (result != -1 || range != -1 || range2 != -1) {
        combo++;
        document.getElementById("judge").innerHTML = `<p>ポン！ ○   ${conbo}コンボ</p>`;
        var result2 = pushArray.indexOf(count);
        if (result2 == -1) {
            pushArray.push(count);
            rate = Math.floor(pushArray.length / searchedArray[0].length * 10000) / 100;
            trueScore++;
        }
        document.getElementById("rate").innerHTML = "<p>一致率： " + rate + "%</p>";
        document.getElementById("truescore").innerHTML = "<p>○： " + trueScore + "</p>";
    } else {
        combo = 0;
        document.getElementById("judge").innerHTML = `<p>ポン！ ×   ${conbo}コンボ</p>`;
        falseScore++;
        document.getElementById("falsescore").innerHTML = "<p>×： " + falseScore + "</p>";
    };
};