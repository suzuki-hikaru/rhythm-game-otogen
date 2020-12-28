/////////　カウント処理/////////
let count = 0;
var i = 0;
let countupVal;
var trueScore = 0;
var falseScore = 0;

let countup = function () {
    count++;
    if (count == searchedArray[0][i]) {
        i = i + 1;
        console.log("どん！　" + count);
        document.getElementById("pic").style.display = 'block';
    } else {
        console.log(count);
        document.getElementById("pic").style.display = 'none';
    };
};

///////////　ゲームコントローラー　//////////
var pushArray = [];

function startGame() {
    player.playVideo();
    document.getElementById("rate").innerHTML = "<p>一致率：　0/" + searchedArray[0].length + "</p>";
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
        document.getElementById("judge").innerHTML = '<p>ポン！　×</p>';
        falseScore++;
        document.getElementById("falsescore").innerHTML = "<p>×： " + falseScore + "</p>";
    } else {
        console.log("ポン！　○　" + count);
        document.getElementById("judge").innerHTML = '<p>ポン！　○</p>';
        var result2 = pushArray.indexOf(count);
        if (result2 == -1) {
            pushArray.push(count);
            rate = Math.floor(pushArray.length / searchedArray[0].length * 10000) / 100;
            trueScore++;
        }
        document.getElementById("rate").innerHTML = "<p>一致率： " + rate + "%</p>";
        document.getElementById("truescore").innerHTML = "<p>○： " + trueScore + "</p>";
        // document.getElementById("truescore").innerHTML = "<p>○： " + trueScore + "/" + searchedArray[0].length + "</p>";
    };
};