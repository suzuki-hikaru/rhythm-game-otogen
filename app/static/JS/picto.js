let Human = function () { // Human のコンストラクタ関数
  this.image = new Image();
  this.image.style.position = "fixed";
}

let Player = function () { // Player のコンストラクタ関数
  // Human.apply(this, arguments);
  // this.x = 0;
  // this.y = 0;
  // this.image.src = "humanpicto.png";
}

let Enemy = function () { // Enemy のコンストラクタ関数
  Human.apply(this, arguments);
  this.x = Math.floor(0.8 * window.innerWidth - this.image.width);
  this.y = Math.floor(0.2 * window.innerHeight - this.image.height);
  this.dx = 0;
  this.dy = 1;
  this.image.src = "humanpicto.png";
}

Enemy.prototype = new Human;

Enemy.prototype.update = function () {
  this.y = this.y + this.dy;

  if (this.y > 0.6 * window.innerHeight - this.image.height) {
    this.y = this.y - this.dy;
  }
  this.image.style.left = this.x + "px";
  this.image.style.top = this.y + "px";
}

let enemy = new Array(1);

window.onload = function () {　// ブラウザにコンテンツがロードされたときに1度だけ呼ばれる関数
  for (let i = 0; i < enemy.length; i++) {
    enemy[i] = new Enemy();
  }

  for (let i = 0; i < enemy.length; i++) {
    document.body.appendChild(enemy[i].image);
  }
}

let update = function () { // 画像表示のアップデート
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].update();
  }
}

updateVal = setInterval(update, 10); // 関数updateを10msごとに呼び出す．