addEventListener("keydown", onKeyDown);
addEventListener("keyup", onKeyUp);

function onKeyDown(e) {
    const key = e.code;
    const shiftOn = e.shiftKey;
    if (!(document.activeElement == document.getElementById("search1") || 
            document.activeElement == document.getElementById("search2"))) {
        if (shiftOn) {
            const cuepoints = document.getElementsByClassName("cuepoint");
            for (let i=0; i<cuepoints.length; i++) {
                const cp = cuepoints[i];
                cp.onclick = () => setCuePoint(cp.id);
            }
        }
        for (let player of players) {

            // cuepoints
            for (let i=0; i<player.cueKeyMap.length; i++) {
                let k = player.cueKeyMap[i];
                const cp = player.cuepoints[i];
                k = 'Key' + k.toUpperCase();
                if (k == key) {
                    document.getElementById(cp).click();
                }
            }

            // loops
            for (let i=0; i<player.loopKeyMap.length; i++) {
                let k = player.loopKeyMap[i];
                const loop = player.loops[i];
                k = 'Key' + k.toUpperCase();
                if (k == key) {
                    document.getElementById(loop).click();
                }
            }
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