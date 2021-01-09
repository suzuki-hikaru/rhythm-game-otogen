from flask import Flask, render_template, request
from pytube import YouTube
from googleapiclient.discovery import build
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

@app.route("/playSelect", methods=['GET','POST'])
def ps():
    return render_template("playSelect.html",)

@app.route("/createSelect", methods=['GET','POST'])
def cs():
    def get_videos_search2(keyword):
        #apiキーの設定
        youtube = build('youtube', 'v3', developerKey='')
        youtube_query = youtube.search().list(q=keyword, part='id,snippet', maxResults=5)
        youtube_res = youtube_query.execute()
        return youtube_res.get('items', [])

    name = "ニジュ―"
    array =[]
    array2 =[]
    result = get_videos_search2(name)

    for item in result:
        if item['id']['kind'] == 'youtube#video':
            array.append(item['snippet']['title'])
            array2.append('https://www.youtube.com/watch?v=' + item['id']['videoId'])

    return render_template("createSelect.html", title1 = array[0], title2 = array[1], title3 = array[2], title4 = array[3], title5 = array[4], url1 = array2[0], url2 = array2[1], url3 = array2[2], url4 = array2[3], url5 = array2[4])

@app.route("/esp32", methods=['GET','POST'])
def esp32():
    return render_template("esp32.html",)

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
def createData():
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

@app.route("/youtube", methods =['POST'])
def youtube():
    def get_videos_search(keyword):
        #apiキーの設定
        youtube = build('youtube', 'v3', developerKey='')
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

    return render_template("createSelect.html", message ="『{}』の検索結果".format(name), title1 = array[0], title2 = array[1], title3 = array[2], title4 = array[3], title5 = array[4], url1 = array2[0], url2 = array2[1], url3 = array2[2], url4 = array2[3], url5 = array2[4])
    # return render_template("createSelect.html", message ="『{}』の検索結果".format(name), title1 = array[0], title2 = array[1], title3 = array[2], url1 = array2[0], url2 = array2[1], url3 = array2[2])
