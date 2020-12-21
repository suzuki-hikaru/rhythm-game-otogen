from flask import Flask, render_template, request

#Flaskオブジェクトの生成
app = Flask(__name__)

"""""""""""""""""""""""""""
ルーティングの設定 hikaru
"""""""""""""""""""""""""""
@app.route("/", methods=['GET','POST'])
def get_index():
    return render_template("index.html",)

@app.route("/createMode", methods=['GET'])
def post_index():
    error = "youtubeURL"
    return render_template("createMode.html")

@app.route("/playMode", methods=['GET'])
def post_index():
    name = request.form['name']
    return render_template("createMode.html")

@app.route("/playMode", methods=['POST'])
def post_index():
    name = request.form['name']
    return render_template("playMode.html")