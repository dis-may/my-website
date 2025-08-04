addEventListener("keyup", onKeyUp);

function onKeyUp(e) {
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
        }

        if (key == 'ArrowLeft') {
            player.seekTo(player.getCurrentTime() - 5);
        } else if (key == 'ArrowRight') {
            player.seekTo(player.getCurrentTime() + 5);
        }
    }
}


