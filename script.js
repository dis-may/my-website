window.onload = () => {
    // let iframe = document.getElementById("yt-frame-1");
    // iframe.src = iframe.src;
    iframe = document.getElementById("yt-frame-2");
    iframe.src = iframe.src;
}


const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player1', {
        height: '315',
        width: '560',
        // videoId: 'c9O3OeA1cy4',
        videoId: 'U3HGfwDjX0g',
        playerVars: {
            playsinline: 1,
            controls: 1,
            disablekb: 0,
            color: "white",
        },
        events: {
            // 'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    })
}

let hasCuePoint1 = false;
let timeStamp1 = 0.0;
function saveCuePoint1() {
    if (!hasCuePoint1) {
        setCuePoint1();
        
    } else {
        player.seekTo(timeStamp1);
    }
}

function clearCuePoint1() {
    hasCuePoint1 = false;
    timeStamp1 = 0.0;
    document.getElementById("cp1").innerText = "--:--:--";
}

function setCuePoint1() {
    hasCuePoint1 = true;
    document.getElementById("cp1").classList.add('orange-active');
    timeStamp1 = player.getCurrentTime();
    document.getElementById("cp1").innerText = formatTime(timeStamp1);
}

// when you click on the player to play, returns focus to the main body
// instead of the iframe, so keyboard controls still work
function onPlayerStateChange() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        document.getElementById("pb1").innerText = "pause";
    } else {
        document.getElementById("pb1").innerText = "play_arrow";
    }
 document.getElementById("p1").focus();
    console.log("should have fosued");
}

function togglePlayPause() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        document.getElementById('pb1').innerText = "play_arrow";
    } else  {
        player.playVideo();
        document.getElementById('pb1').innerText = "pause";

    }
}

// function loadNewVideo(