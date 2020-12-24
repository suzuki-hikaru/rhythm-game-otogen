from flask import Flask, render_template, request
from pytube import YouTube

#Flaskオブジェクトの生成
app = Flask(__name__)

"""""""""""""""""""""""""""
ルーティングの設定
"""""""""""""""""""""""""""
@app.route("/", methods=['GET','POST'])
def route():
    return render_template("index.html",)

@app.route("/index", methods=['GET','POST'])
def index():
    return render_template("index.html",)

@app.route("/selectMode", methods=['GET','POST'])
def select():
    return render_template("selectMode.html",)

@app.route("/login", methods=['GET','POST'])
def login():
    return render_template("login.html",)

@app.route("/createMode", methods=['GET'])
def get_create():
    error = "youtubeURLを入力して下さい"
    return render_template("selectMode.html", inform = error)

@app.route("/createMode", methods=['POST'])
def post_create():
    url_name = request.form['name']
    yt = YouTube(url_name)
    video_name = yt.title
    video = yt.streams.filter(subtype='mp4').first()
    video.download('./app/rsc/movies/')
    return render_template("createMode.html", url = url_name, title = video_name, path = './static/movies/' + video_name + '.mp4')

"""""""""""""""""""""""""""
###コーディング中###
"""""""""""""""""""""""""""
@app.route("/playMode", methods=['GET'])
def get_play():
    error = "youtubeURLを入力して下さい"
    return render_template("selectMode.html", inform = error)

@app.route("/playMode", methods=['POST'])
def post_play():
    url_name = request.form['name']
    return render_template("playMode.html", url = url_name,)