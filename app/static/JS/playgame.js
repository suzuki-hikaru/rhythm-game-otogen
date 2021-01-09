let upCanvas = function () {
    this.x = document.getElementById("canvas").getBoundingClientRect().left;
    this.y = document.getElementById("canvas").getBoundingClientRect().top;
    this.endx = document.getElementById("canvas").getBoundingClientRect().left + 300;
    this.endy = document.getElementById("canvas").getBoundingClientRect().top + 130;
}

let Enemy = function () { // Enemy のコンストラクタ関数
    this.image = new Image();
    this.image.style.position = "absolute";
    this.x = upcanvas.x;
    this.y = upcanvas.y + 40;
    this.dx = 1;
    this.dy = 0;
    this.image.src = "/static/images/oto.png";

    this.update = function () {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.image.style.left = this.x + "px";
        this.image.style.top = this.y + "px";

        if (this.x > upcanvas.endx - this.image.width) {
            this.x = this.x - this.dx;
            this.image.style.display = "none" //要検討
        }
    }
}
let gameover = function () {
    clearInterval(updateVal);
}

let update2 = function () {
    for (let item of enemys) {
        item.update();
    }
}

/* ここで定義 */
let updateVal2;
let enemys = [];
updateVal2 = setInterval(update2, 10);
const gearea = document.getElementById("gearea")

/* これが呼び出される */
var ge = function () {
    upcanvas = new upCanvas();
    enemy = new Enemy();
    // document.body.appendChild(enemy.image);
    gearea.appendChild(enemy.image);
    enemys.push(enemy);
}