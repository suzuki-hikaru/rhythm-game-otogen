/////////　カウント処理/////////
let count = 0;
let countupVal;

let countup = function () {
    count++;
    console.log(count);
};

///////////　ゲームコントローラー　//////////
countsToFirebase = [];

function startGame() {
    player.playVideo();
    count = 0;
    countupVal = setInterval('countup();', 100);
};

function stopGame() {
    player.stopVideo();
    clearInterval(countupVal);
    // window.alert("セーブされた記録が消えます。よろしいですか？");
    // if (confirm) {
    //     countsToFirebase.length = 0;
    // };
};

function appendCount() {
    var apResult = pushArray.indexOf(count);
    if (apResult == -1) {
        countsToFirebase.push(count);
    }
    console.log("どん！　" + count);

};