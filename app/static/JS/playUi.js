let updateVal;

let Bou = function () { // Bou のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "fixed";
    this.y = 0.6 * (window.innerHeight - this.image.height);
    this.x = 0.75 * (window.innerWidth - this.image.width);
    this.image.width = 200;
    this.image.height = 20;
    this.image.src = "/static/images/bou.png";
}

Bou.update = function () {
    this.x = this.x;
    this.y = this.y;
    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";
}

let Enemy = function () { // Enemy のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "fixed";
    this.y = 0.2 * (window.innerHeight - this.image.height);
    this.x = 0.8 * (window.innerWidth - this.image.width);
    this.dx = 0;
    this.dy = 1;
    this.image.src = "/static/images/humanpicto.png";
}

Enemy.update = function () {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";

    if (this.y > 0.8 * (window.innerHeight - this.image.height)) {
        this.y = this.y - this.dy;
        this.dy *= -1;
    }

    if ((Math.abs(bou.x - this.x) < bou.image.width) && (Math.abs(bou.y - this.y) < bou.image.height)) {
        // gameover();
    }
}

let bou;
let enemy;

let update_list = function () { // 画像表示のアップデート
}

function gameover() {
    clearInterval(countupVal); // 関数countupを一定時間ごとに呼び出していたのを止める．
    clearInterval(updateVal); // 関数updateを一定時間ごとに呼び出していたのを止める．
}
