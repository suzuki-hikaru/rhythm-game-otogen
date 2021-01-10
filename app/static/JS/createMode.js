/////////　カウント処理/////////
let count = 0;
let countupVal;
let sum = 0;

let countup = function () {
    count++;
    console.log(count);
};

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
    //error: 同じ要素が複数含まれるとplayできない。
    // var apResult = pushArray.indexOf(count);
    // if (apResult == -1) {
    sum = sum + 1;
    document.getElementById("sumRhythm").innerHTML = `<p>総rhythm数：${sum}</p>`
    countsToFirebase.push(count);
    // }
    console.log("どん！　" + count);
    ge();
};