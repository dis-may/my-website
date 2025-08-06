addEventListener("keydown", onKeyDown);
addEventListener("keyup", onKeyUp);

let wasPlaying = [true, true];
let lastKey = null;

function onKeyDown(e) {

    const key = e.key.toUpperCase();

    if (lastKey == key) {
        return;
    }

    console.log(key);
    const shiftOn = e.shiftKey;
    // check if the search field is focused. if so, ignore the keybinds
    if (!(document.activeElement == document.getElementById("search1") || 
            document.activeElement == document.getElementById("search2"))) {
        // HOTCUES!!!!
        // change colour if shift is on AND change function
        if (shiftOn && key == "SHIFT") {
            const cuepoints = document.getElementsByClassName("cuepoint");
            for (let i=0; i<cuepoints.length; i++) {
                const cp = cuepoints[i];
                cp.onclick = () => setCuePoint(cp.id);
                cp.classList.add("bold-text");
            }
            const keybinds = document.getElementsByClassName("keybinds");
            for (const kb of keybinds) {
                kb.classList.add("white-text");
            }
        } else if (shiftOn && key != 'SHIFT') {
            // quick fix since shift + semicolon is : not ;
            if (key == ':') {
                setCuePoint('cp15');
            }
            for (let j=0; j<players.length; j++) {
                const player = players[j];
                // cuepoints
                for (let i=0; i<player.cueKeyMap.length; i++) {
                    let k = player.cueKeyMap[i];
                    const cp = player.cuepoints[i];
                    k = k.toUpperCase();

                    if (k == key) {
                        lastKey = key;
                        setCuePoint(cp);
                    }

                    
                }
            }

        } else {
            for (let j=0; j<players.length; j++) {
                const player = players[j];
                // cuepoints
                for (let i=0; i<player.cueKeyMap.length; i++) {
                    let k = player.cueKeyMap[i];
                    const cp = player.cuepoints[i];
                    k = k.toUpperCase();

                    if (k == key) {
                        lastKey = key;
                        // document.getElementById(cp).click();
                        if (player.player.getPlayerState() == YT.PlayerState.PLAYING) {
                            pressCuePoint(cp);
                        } else {
                            pressCuePoint(cp);
                            wasPlaying[j] = false;
                            player.player.playVideo();
                        }
                    }
                }

                // loops
                // so far loops not implemented yet, replaced with hotkeys
                // for (let i=0; i<player.loopKeyMap.length; i++) {
                //     let k = player.loopKeyMap[i];
                //     const loop = player.loops[i];
                //     k = k.toUpperCase();
                //     if (k == key) {
                //         document.getElementById(loop).click();
                //     }
                // }
            }
        }
        // scrub controls
        if (key == 'ARROWLEFT') {
            player1.player.seekTo(player1.player.getCurrentTime() - 5);
        } else if (key == 'ARROWRIGHT') {
            player1.player.seekTo(player1.player.getCurrentTime() + 5);
        } else if (key == 'Z') {
            player2.player.seekTo(player2.player.getCurrentTime() - 5);
        } else if (key == 'C') {
            player2.player.seekTo(player2.player.getCurrentTime() + 5);
        } else if (key == 'F') {
            player1.togglePlayPause();
        } else if (key == 'J') {
            player2.togglePlayPause();
        }
    } else {
        // else means if the search field is focused. 
        // if so, want enter key to press Go! button
        if (document.activeElement == document.getElementById("search1")) {
            if (key == 'ENTER') {
                document.getElementById('go1').click();
            }
        } else if (document.activeElement == document.getElementById("search2")) {
            if (key == 'ENTER') {
                document.getElementById('go2').click();
            }
        }
    }
    
}


function onKeyUp(e) {
    const shiftOn = e.shiftKey;

    if (!shiftOn) {
        const cuepoints = document.getElementsByClassName("cuepoint");
        for (let i=0; i<cuepoints.length; i++) {
            const cp = cuepoints[i];
            cp.onclick = () => pressCuePoint(cp.id);
            cp.classList.remove('bold-text');
        }
        const keybinds = document.getElementsByClassName("keybinds");
            for (const kb of keybinds) {
                kb.classList.remove("white-text");
        }
    }
    const combinedMap = [];
    for (p of players) {
        combinedMap.push(...p.cueKeyMap);
    }
    if (combinedMap.includes(lastKey) == true) {
        for (let i=0; i<wasPlaying.length; i++) {
            if (wasPlaying[i] == false) {
                players[i].player.pauseVideo();
                wasPlaying[i] = true;
            }
        }
    }
    lastKey = null;
}