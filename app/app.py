from flask import Flask, render_template, request
from pytube import YouTube

#Flaskオブジェクトの生成
app = Flask(__name__)

"""""""""""""""""""""""""""
ルーティングの設定 hikaru
"""""""""""""""""""""""""""
@app.route("/", methods=['GET','POST'])
def index():
    return render_template("index.html",)

@app.route("/test", methods=['GET','POST'])
def test():
    return render_template("test.html",)

@app.route("/createMode", methods=['GET'])
def get_create():
    error = "youtubeURLを入力して下さい"
    return render_template("createMode.html", inform = error)

@app.route("/playMode", methods=['GET'])
def get_play():
    error = "youtubeURLを入力して下さい"
    return render_template("playMode.html", inform = error)

@app.route("/createConfirm", methods=['POST'])
def post_create_confirm():
    url_name = request.form['name']
    yt = YouTube(url_name)
    video_name = yt.title
    video = yt.streams.filter(subtype='mp4').first()
    video.download('./app/rsc/movies/')
    return render_template("createConfirm.html", url = url_name, title = video_name, path = './rsc/movies/' + video_name + '.mp4')

@app.route("/createMode", methods=['POST'])
def post_create():
    return render_template("createMode.html")

@app.route("/playMode", methods=['POST'])
def post_play():
    url_name = request.form['name']
    # ここにyoutube動画取得の処理
    return render_template("playMode.html", url = url_name)