async function game() {
    let updateVal;

    let Player = function () { // Player のコンストラクタ関数
        this.image = new Image();
        this.image.style.position = "fixed";
        this.x = 0;
        this.y = 0;
        this.image.src = "taiko.png";
    }

    let canvas = function () {
        this.x = document.getElementById("canvas").getBoundingClientRect().left;
        this.y = document.getElementById("canvas").getBoundingClientRect().top;
        this.endx = document.getElementById("canvas").getBoundingClientRect().left + 300;
        this.endy = document.getElementById("canvas").getBoundingClientRect().top + 130;

        this.getx = function () {
            return this.x;
        }

        this.gety = function () {
            return this.y;
        }

        this.getendx = function () {
            return this.endx;
        }

        this.getendy = function () {
            return this.endy;
        }
    }

    let Enemy = function () { // Enemy のコンストラクタ関数
        this.image = new Image();
        this.image.style.position = "fixed";
        this.x = canvas.x;
        this.y = canvas.y + 50;
        this.dx = 2;
        this.dy = 0;
        this.image.src = "taiko.png";

        this.update = function () {
            this.x = this.x + this.dx;
            this.y = this.y + this.dy;

            if (this.x > canvas.endx - this.image.width) {
                this.x = this.x - this.dx;
                //本当にこれでいいのか...要検討
                this.image.style.display = "none"
            }

            this.image.style.left = this.x + "px";
            this.image.style.top = this.y + "px";

            if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
                gameover();
            }
        }
    }

    function MouseMove(e) {
        player.x = (e.clientX - player.image.width / 2);
        player.y = (e.clientY - player.image.height / 2);
        player.image.style.left = player.x + "px";
        player.image.style.top = player.y + "px";
    }

    let update = function () { // 画像表示のアップデート
        console.log("update")
        enemy.update();
    }

    function gameover() {
        clearInterval(updateVal); // 関数updateを一定時間ごとに呼び出していたのを止める．
    }

    // ブラウザにコンテンツがロードされたときに1度だけ呼ばれる
    let player = new Player();
    let enemy = new Enemy();

    document.body.appendChild(player.image);
    document.body.appendChild(enemy.image);

    // マウスが移動したときに MouseMove 関数が呼ばれるようにイベントリスナを設定
    if (document.addEventListener) {
        document.addEventListener("mousemove", MouseMove);
    } else if (document.attachEvent) {
        document.attachEvent("onmousemove", MouseMove);
    }

    updateVal = setInterval(update, 1000); // 関数updateを10msごとに呼び出す．
}
