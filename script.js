// if using iframes, the below code stops caching and forces reload

// window.onload = () => {
//     // let iframe = document.getElementById("yt-frame-1");
//     // iframe.src = iframe.src;
//     iframe = document.getElementById("yt-frame-2");
//     iframe.src = iframe.src;
// }



const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = [];
function onYouTubeIframeAPIReady() {
    player1 = new YoutubePlayer(
        id='player1',
        // videoId='c9O3OeA1cy4', // shiki no uta
        videoId='nQstIbfauyo', // meme sound effects
        playButton='pb1',
        searchField='search1',
        searchGo='go1',
        cuepoints=["cp00", "cp01", "cp02", "cp03", "cp04", "cp05"],
        loops=["l00", "l01", "l02"],
        cueKeyMap=["Q", "W", "E", "A", "S", "D"],
        loopKeyMap=[ "A", "S", "D"]

    );

    player2 = new YoutubePlayer(
        id='player2',
        videoId='D-M5NTY0y7g', // jamiroquai
        playButton='pb2',
        searchField='search2',
        searchGo='go2',
        cuepoints=["cp10", "cp11", "cp12", "cp13", "cp14", "cp15"],
        loops=["l10", "l11", "l12"],
        cueKeyMap=["I", "O", "P", "K", "L", ";"],
        loopKeyMap=[ "K", "L", ";"]

    );

    players.push(player1);
    players.push(player2);
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
    const currPlayer = players[event.target.id - 1];
    console.log(currPlayer);
    console.log(currPlayer.id);
    console.log(currPlayer.playButton);

    if (currPlayer.player.getPlayerState() == YT.PlayerState.PLAYING) {
        document.getElementById(currPlayer.playButton).innerText = "pause";
    } else if (currPlayer.player.getPlayerState() == YT.PlayerState.PAUSED){
        document.getElementById(currPlayer.playButton).innerText = "play_arrow";
    }
    document.getElementById(currPlayer.playButton[0] + currPlayer.playButton[2]).focus();
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


class YoutubePlayer {
    constructor(id, videoId, playButton, searchField, searchGo, cuepoints, loops, cueKeyMap, loopKeyMap) {
        this.id = id;
        this.videoId = videoId;
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
        videoId: this.videoId,
        // videoId: 'c9O3OeA1cy4',
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
            document.getElementById(this.playButton).innerText = "play_arrow";
        } else  {
            this.player.playVideo();
            document.getElementById(this.playButton).innerText = "pause";

        }
    }
    loadVideo() {
        let URL = document.getElementById(this.searchField).value;
        // there are two main types of youtube links
        // https://www.youtube.com/watch?v=HDkkJ3hoiBE and 
        // https://youtu.be/HDkkJ3hoiBE?si=PMjsZDkweEX4X79K
        // in both cases, the 11 character video ID is HDkkJ3hoiBE


        if (URL.indexOf("youtube.com") != -1) {
            // remove the extra parameters
            if (URL.indexOf("&") != -1) {
                URL = URL.substring(0, URL.indexOf("&"));
            }
            // isolate the Video ID, which is 11 characters long
            URL = URL.substring(URL.length - 11, URL.length);
            this.player.cueVideoById(URL);
        } else if (URL.indexOf("youtu.be") != -1) {
            const i = URL.indexOf("youtu.be");
            // isolate the Video ID
            URL = URL.substring(i+9,i+20);
            this.player.cueVideoById(URL);
        } else {
            alert("Invalid YouTube URL!")
        }
        // this.player.cueVideoById(URL);
    }
}

