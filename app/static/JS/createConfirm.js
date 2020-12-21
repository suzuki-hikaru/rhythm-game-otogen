// youtubeidの取得
function getId() {
    var url = "{{ url }}";
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        // console.log("video id = ", videoid[1]);
        videoId = videoid[1]
    } else {
        console.log("The youtube url is not valid.");
    }
}

// 関数呼び出し、id更新
var videoId;
getId()

// iframeの作成
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// iframeの設定
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '360',
        width: '640',
        videoId: videoId,
    });
}