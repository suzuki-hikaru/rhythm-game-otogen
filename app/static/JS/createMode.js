var count;

function countup() {
    count++;
    console.log(count);
};

function startGame() {
    player.playVideo();
    count = 0; //カウントの初期化
    timerID = setInterval('countup();', 1000); //1秒毎にcountup()を呼び出し
};

function saveDB() {
    player.stopVideo();
    console.log("押しました！" + count);
};
