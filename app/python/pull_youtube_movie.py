from pytube import YouTube

# ダウンロードしたい動画のURLをいれて取得
yt = YouTube('https://www.youtube.com/watch?v=kj8kpQhiZpM')
print(yt.title)
video = yt.streams.filter(subtype='mp4').first()
video.download('../rsc/movies/')