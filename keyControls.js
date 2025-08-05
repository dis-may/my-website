addEventListener("keydown", onKeyDown);
addEventListener("keyup", onKeyUp);

function onKeyDown(e) {
    const key = e.code;
    const shiftOn = e.shiftKey;
    console.log(e.code);
    console.log(shiftOn);

    console.log(document.activeElement);
    console.log(document.getElementById("search1"));
    if (!(document.activeElement == document.getElementById("search1") || 
            document.activeElement == document.getElementById("search2"))) {
        if (!shiftOn) {
            if (key == 'KeyS') {
                document.getElementById("cp1").click();
            }
        } else {
            if (key == 'KeyS') {
                setCuePoint1();
            }
            const cuepoints = document.getElementsByClassName("cuepoint");
            for (let i=0; i<cuepoints.length; i++) {
                const cp = cuepoints[i];
                console.log(cp);
                cp.onclick = () => setCuePoint(cp.id);
            }
        }

        if (key == 'ArrowLeft') {
            player.seekTo(player.getCurrentTime() - 5);
        } else if (key == 'ArrowRight') {
            player.seekTo(player.getCurrentTime() + 5);
        }
    }
}


function onKeyUp(e) {
    const shiftOn = e.shiftKey;
    // console.log(shiftOff);

    if (!shiftOn) {
        const cuepoints = document.getElementsByClassName("cuepoint");
        for (let i=0; i<cuepoints.length; i++) {
            const cp = cuepoints[i];
            console.log(cp);
            cp.onclick = () => pressCuePoint(cp.id);
        }
    }
}