let Canvas = function () {
    this.x = document.getElementById("canvas").getBoundingClientRect().left;
    this.y = document.getElementById("canvas").getBoundingClientRect().top;
    this.endx = document.getElementById("canvas").getBoundingClientRect().left + 300;
    this.endy = document.getElementById("canvas").getBoundingClientRect().top + 130;
}

let Player = function () { // Player のコンストラクタ関数
    this.x = canvas.endx - 20;
    this.y = canvas.y - 65;
    this.image = new Image();
    this.image.style.position = "absolute";
    this.image.src = "/static/images/player.png";
    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";
}

let Enemy = function () { // Enemy のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "absolute";
    this.x = canvas.x;
    this.y = canvas.y + 50;
    this.dx = 2;
    this.dy = 0;
    this.image.src = "/static/images/oto.png";

    this.update = function () {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        this.image.style.left = this.x + "px";
        this.image.style.top = this.y + "px";
        if (this.x > canvas.endx - this.image.width) {
            this.x = this.x - this.dx;
            // 本当にこれでいいのか...要検討
            this.image.style.display = "none"
        }
        if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
            // ここでやってもいいけどplayModeで判定したほうが正確
        }
    }
}
function gameover() {
    clearInterval(updateVal); // 関数updateを一定時間ごとに呼び出していたのを止める．
}

/* test */
let updateVal2;
let update2 = function () {
    enemy2.update();
}

let geTest = function () {
    let enemy2 = new Enemy();
    document.body.appendChild(enemy2.image);
    updateVal2 = setInterval(update2, 100);
}

/* ここが実行 */
let canvas = new Canvas();
////////////////////////