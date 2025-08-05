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

let players = [];
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
    player2 = new YoutubePlayer(
        id='player2',
        searchField='search2',
        searchGo='go2',
        playButton='pb2',
        cuepoints=["cp10", "cp11", "cp12"],
        loops=["l10", "l11", "l12"],
        cueKeyMap=["I", "O", "P",],
        loopKeyMap=[ "K", "L", ";"]

    );

    players.push(player);
    players.push(player2);
    // player2.cuepoints = ;
    // player2.loops = ;
    // player2.keyMap = ;
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
    console.log(document.getElementById("cp1").classList);
    document.getElementById("cp1").classList.add('orange-active');
    timeStamp1 = player.getCurrentTime();
    document.getElementById("cp1").innerText = formatTime(timeStamp1);
}

function setCuePoint(id) {
    const playerNumber = parseInt(id[2]);
    const cuepointNumber = parseInt(id[3]);
    const player = players[playerNumber];
    player.hasCuepoints[cuepointNumber] = true;
    // currently it is the second element, could change if styling changes
    const colourClass = document.getElementById(id).classList[1];
    // add the active version of the colour to the class list
    player.timeCuepoints[cuepointNumber] = player.player.getCurrentTime();
    document.getElementById(id).classList.add(`${colourClass}-active`);
    document.getElementById(id).innerText = formatTime(player.timeCuepoints[cuepointNumber]);
}

function pressCuePoint(id) {
    const playerNumber = parseInt(id[2]);
    const cuepointNumber = parseInt(id[3]);
    const player = players[playerNumber];
    // console.log(players);
    // console.log(id[-2]);
    const hasCuePoint = player.hasCuepoints[cuepointNumber];
    if (!hasCuePoint) {
        setCuePoint(id);
    } else {
        player.player.seekTo(player.timeCuepoints[cuepointNumber]);
    }

}

// when you click on the player to play, returns focus to the main body
// instead of the iframe, so keyboard controls still work
function onPlayerStateChange(event) {
    const currPlayer = event.target;
    if (currPlayer.getPlayerState() == YT.PlayerState.PLAYING) {
        document.getElementById(currPlayer.playButton).innerText = "pause";
    } else if (currPlayer.getPlayerState() == YT.PlayerState.PAUSED){
        document.getElementById(currPlayer.playButton).innerText = "play_arrow";
    }
    document.getElementById(currPlayer.playButton).focus();
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

// function loadVideo() {
//     let URL = document.getElementById("search1").value;
//     URL = URL.substring(URL.length - 11, URL.length);
//     player.loadVideoById(URL);
// }


class YoutubePlayer {
    constructor(id, playButton, searchField, searchGo, cuepoints, loops, cueKeyMap, loopKeyMap) {
        this.id = id;
        this.playButton = playButton;
        this.searchField = searchField;
        this.searchGo = searchGo;
        this.cuepoints = cuepoints;
        this.loops = loops;
        this.cueKeyMap = cueKeyMap;
        this.loopKeyMap = loopKeyMap;

        this.hasCuepoints = [false, false, false];
        this.timeCuepoints = [0.0, 0.0, 0.0];
        this.hasLoops = [false, false, false];

        this.player = new YT.Player(id, {
        height: '315',
        width: '560',
        videoId: 'c9O3OeA1cy4',
        // videoId: 'U3HGfwDjX0g',
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
    togglePlayPause() {
        if (this.player.getPlayerState() == YT.PlayerState.PLAYING) {
            this.player.pauseVideo();
            document.getElementById(playButton).innerText = "play_arrow";
        } else  {
            this.player.playVideo();
            document.getElementById(playButton).innerText = "pause";

        }
    }
    loadVideo() {
        console.log("here");
        let URL = document.getElementById(searchField).value;
        URL = URL.substring(URL.length - 11, URL.length);
        this.player.loadVideoById(URL);
    }
}

