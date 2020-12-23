let count = 0;
let countupVal;
countsToFirebase = [];

let countup = function () {
    count++;
    console.log(count);
};

function startGame() {
    player.playVideo();
    count = 0; //カウントの初期化
    countupVal = setInterval('countup();', 250); //0.25秒毎にcountup()を呼び出し
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
    countsToFirebase.push(count);
    console.log("どん！　" + count);
};