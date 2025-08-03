document.getElementById("counter").onclick = () => {
    counterDisplay = document.getElementById("counter-display");
    const curr = parseInt(counterDisplay.textContent) + 1;
    counterDisplay.textContent = curr;
}

function toggleStyle() {
    const themes = ['light', 'dark'];

    themes.forEach( t => {
        const link = document.getElementById(`theme-${t}`);
        if (link) {
            link.disabled = !link.disabled;
        }

    });

    
}

function playStayWithMe() {
    document.getElementById("song").play();
}