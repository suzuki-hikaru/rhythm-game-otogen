# -*- coding: utf-8 -*-

from flask import Flask, render_template, request
from pytube import YouTube
from googleapiclient.discovery import build
import gspread
import json
from oauth2client.service_account import ServiceAccountCredentials 

#Flaskオブジェクトの生成
app = Flask(__name__)

# login
@app.route("/login", methods=['GET','POST'])
def login():
    return render_template("login.html",)

#index
@app.route("/", methods=['GET','POST'])
def route():
    return render_template("index.html",)

@app.route("/index", methods=['GET','POST'])
def index():
    return render_template("index.html",)

# play
@app.route("/playSelect", methods=['GET','POST'])
def ps():
    return render_template("playSelect.html",)

@app.route("/docPost", methods=['POST'])
def post_doc():
    doc_name = request.form['name']
    return render_template("playMode.html", doc_name = doc_name,)

# create
@app.route("/youtube", methods =['POST'])
def youtube():
    def get_videos_search(keyword):
        #apiキーの設定
        youtube = build('youtube', 'v3', developerKey='AIzaSyBu27ng7Ibjh4kHksbtvJobBWTzvr8yPIQ')
        youtube_query = youtube.search().list(q=keyword, part='id,snippet', maxResults=6)
        youtube_res = youtube_query.execute()
        return youtube_res.get('items', [])

    name = request.form['name']
    array =[]
    array2 =[]
    result = get_videos_search(name)

    for item in result:
        if item['id']['kind'] == 'youtube#video':
            array.append(item['snippet']['title'])
            array2.append('https://www.youtube.com/watch?v=' + item['id']['videoId'])

    # return render_template("createSelect.html", message ="『{}』の検索結果".format(name), title1 = array[0], title2 = array[1], title3 = array[2], title4 = array[3], title5 = array[4], url1 = array2[0], url2 = array2[1], url3 = array2[2], url4 = array2[3], url5 = array2[4])
    return render_template("createSelect.html", message ="『{}』の検索結果".format(name), title1 = array[0], title2 = array[1], title3 = array[2], url1 = array2[0], url2 = array2[1], url3 = array2[2])

@app.route("/createSelect", methods=['GET','POST'])
def cs():
    def get_videos_search2(keyword):
        youtube = build('youtube', 'v3', developerKey='AIzaSyBu27ng7Ibjh4kHksbtvJobBWTzvr8yPIQ')
        youtube_query = youtube.search().list(q=keyword, part='id,snippet', maxResults=6)
        youtube_res = youtube_query.execute()
        return youtube_res.get('items', [])

    name = "NiziU"
    array =[]
    array2 =[]
    result = get_videos_search2(name)

    for item in result:
        if item['id']['kind'] == 'youtube#video':
            array.append(item['snippet']['title'])
            array2.append('https://www.youtube.com/watch?v=' + item['id']['videoId'])

    # return render_template("createSelect.html", title1 = array[0], title2 = array[1], title3 = array[2], title4 = array[3], title5 = array[4], url1 = array2[0], url2 = array2[1], url3 = array2[2], url4 = array2[3], url5 = array2[4])
    return render_template("createSelect.html", message ="『{}』の検索結果".format(name), title1 = array[0], title2 = array[1], title3 = array[2], url1 = array2[0], url2 = array2[1], url3 = array2[2])


@app.route("/createMode", methods=['POST'])
def post_create():
    url_name = request.form['name']
    yt = YouTube(url_name)
    video_name = yt.title
    video = yt.streams.filter(subtype='mp4').first()
    video.download('./app/static/movies/')
    return render_template("createMode.html", url = url_name, yt_title = video_name, path = './app/static/movies/' + video_name + '.mp4')

# esp32
@app.route("/esp32-1", methods=['GET','POST'])
def esp32():
    return render_template("esp32-1.html",)

@app.route("/esp32-2", methods=['GET','POST'])
def createData():
    ss_url = request.form['name']
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_name('app/static/key/config.json', scope)
    gc = gspread.authorize(credentials)
    SPREADSHEET_KEY = ss_url
    worksheet = gc.open_by_key(SPREADSHEET_KEY).sheet1
    col_list_time = worksheet.col_values(3)
    strcol = str(col_list_time)
    strcol = (strcol[1:-1])
    return render_template("esp32-2.html",countTimes=col_list_time, strcol=strcol)

@app.route("/createEsp", methods=['POST'])
def createEsp():
    return render_template("index.html",)