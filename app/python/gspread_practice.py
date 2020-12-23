import gspread
from oauth2client.service_account import ServiceAccountCredentials 
 
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
 
# 秘密鍵（JSONファイル）のファイル名を入力
credentials = ServiceAccountCredentials.from_json_keyfile_name('spreadsheet-sample.json', scope)
gc = gspread.authorize(credentials)
 
# ↑ここまでは毎回同じ内容
# ↓ここからは毎回違う内容（ここから記述） 
 
 
# 「キー」でワークブックを取得
SPREADSHEET_KEY = '対象のスプレッドシートキー'
wb = gc.open_by_key(SPREADSHEET_KEY)
 
# 「sheet1」で一番左のシートを取得
ws = wb.sheet1