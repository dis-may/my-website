addEventListener("keydown", onKeyDown);
addEventListener("keyup", onKeyUp);

function onKeyDown(e) {
    const key = e.key.toUpperCase();
    console.log(key);
    const shiftOn = e.shiftKey;
    // check if the search field is focused. if so, ignore the keybinds
    if (!(document.activeElement == document.getElementById("search1") || 
            document.activeElement == document.getElementById("search2"))) {
        if (shiftOn) {
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

        }
        for (let player of players) {

            // cuepoints
            for (let i=0; i<player.cueKeyMap.length; i++) {
                let k = player.cueKeyMap[i];
                const cp = player.cuepoints[i];
                k = k.toUpperCase();
                if (k == key) {
                    document.getElementById(cp).click();
                }
            }

            // loops
            for (let i=0; i<player.loopKeyMap.length; i++) {
                let k = player.loopKeyMap[i];
                const loop = player.loops[i];
                k = k.toUpperCase();
                if (k == key) {
                    document.getElementById(loop).click();
                }
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
}