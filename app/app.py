from flask import Flask, render_template, request
from pytube import YouTube
import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials 

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
    video.download('./app/static/movies/')
    return render_template("createMode.html", url = url_name, yt_title = video_name, path = './app/static/movies/' + video_name + '.mp4')

@app.route("/playMode", methods=['GET'])
def get_play():
    error = "youtubeURLを入力して下さい"
    return render_template("selectMode.html", inform = error)

@app.route("/playMode", methods=['POST'])
def post_play():
    url_name = request.form['name']
    return render_template("playMode.html", url = url_name,)


@app.route("/docPost", methods=['POST'])
def post_doc():
    doc_name = request.form['name']
    return render_template("docPlayMode.html", doc_name = doc_name,)

@app.route("/createData", methods=['GET','POST'])
def esp32():
    ss_url = request.form['name']
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_name('app/static/key/config.json', scope)
    gc = gspread.authorize(credentials)
    # SPREADSHEET_KEY = '1LecCnNZvPWf6w3cMp2HD9EZxslSTSFpwxjtcILBZJ-M' ##テスト用
    # SPREADSHEET_KEY = '1YmMxOOkyu7hrPy9o6TIF2S-MBjxcmZzm-UT8cZK25os' ##compose
    SPREADSHEET_KEY = ss_url
    worksheet = gc.open_by_key(SPREADSHEET_KEY).sheet1
    col_list_time = worksheet.col_values(3)
    return render_template("createData.html",countTimes=col_list_time)

@app.route("/createEsp", methods=['POST'])
def createEsp():
    return render_template("selectMode.html",)

@app.route("/test", methods=['GET','POST'])
def test():
    return render_template("testui.html",)