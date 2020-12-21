function SquareLoop() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var x = 240;
    var y = 0;
    var bottom = canvas.height - 80;
    var speed = 5;
    var sizeX = 40;
    var sizeY = 12;
    var hitSizeY = 15;
    var spaceFlag = false;
    var num = 0;

    // 追加
    var time = 0;

    /*キーボード操作の制御*/
    document.addEventListener("keydown", KeyDownFunc);
    document.addEventListener("keyup", KeyUpFunc);
    ctx.font = "16px Arial";

    function render() {
        if (y >= canvas.height - 50) {
            y = 0;
        } else {
            y += speed;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height - 38);
        ctx.strokeRect(x, bottom, sizeX, sizeY);
        ctx.beginPath();
        ctx.fillRect(x, y, sizeX, sizeY);
    }
    /*SpaceKeyが押された時の処理*/
    function KeyDownFunc(e) {
        if (e.keyCode == 32 && y >= bottom - hitSizeY && y <= bottom + hitSizeY) {
            spaceFlag = true;
            num++;
        }
    }

    function KeyUpFunc(e) {
        if (e.keyCode == 32 && y > bottom + hitSizeY) {
            spaceFlag = false;
        }
    }

    function hit() {
        if (spaceFlag == true) {
            ctx.clearRect(0, 264, canvas.width, canvas.height);
            ctx.fillText('HIT!' + num, 300, 280);
        }
    }

    setInterval(render, 50);
    setInterval(hit, 50);
}
SquareLoop();
