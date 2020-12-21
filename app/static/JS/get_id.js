function getId() {
    var url = "https://www.youtube.com/watch?v=3ymwOvzhwHs";
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        console.log("video id = ", videoid[1]);
    } else {
        console.log("The youtube url is not valid.");
    }
}
getId()
