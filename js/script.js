// keyboard input section
let currentKeydowns = [];

function addPressEffects(event) {
    const domElement = document.querySelector(`.key.${event.code}`);
    if (!domElement) {
        return; // stop the function immediately
    } else if (domElement.classList.contains('white')) {
        domElement.classList.add("active-white");
    } else if (domElement.classList.contains('black')) {
        domElement.classList.add("active-black");
    }
}
function playSoundOnPress(event) {
    const audio = document.querySelector(`audio.${event.code}`)
    if (!audio || event.repeat || currentKeydowns.includes(event.code)) return; // stop the function immediately
    audio.currentTime = 0;
    audio.play();
    currentKeydowns.push(event.code);
}
function pressPianoKey(event) {
    playSoundOnPress(event);
    addPressEffects(event);
}
function releasePianoKey(event) {
    const key = document.querySelector(`.key.${event.code}`);
    if (!key) return;
    key.classList.remove("active-white", "active-black");
    currentKeydowns = currentKeydowns.filter(keydown => keydown !== event.code);
}

window.addEventListener("keyup", releasePianoKey);
window.addEventListener("keydown", pressPianoKey);

// mouse input section
function addClickEffects(event) {
    const domElement = event.target;
    if (domElement.classList.contains('white')) {
        domElement.classList.add("active-white");
    } else if (domElement.classList.contains('black')) {
        domElement.classList.add("active-black");
    }
}
function playSoundOnClick(event) {
    const sounds = document.querySelectorAll('audio');
    const key = event.target;
    sounds.forEach(sound => {
        if (key.classList.contains(sound.className)) {
            sound.currentTime = 0;
            sound.play();
            return;
        }
    });
}
function clickPianoKey(event) {
    playSoundOnClick(event);
    addClickEffects(event);
}
function unclickPianoKey() {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.classList.remove("active-white", "active-black"));
}
function addHoverEffects(event) {
    const domElement = event.target;
    if (domElement.classList.contains('white')) {
        domElement.classList.add("hover-white");
    } else if (domElement.classList.contains('black')) {
        domElement.classList.add("hover-black");
    }
}
function mouseoverPianoKey(event) {
    addHoverEffects(event);
}
function mouseoutPianoKey(event) {
    const key = event.target;
    key.classList.remove("hover-white", "hover-black");
}

window.addEventListener('mouseup', unclickPianoKey);
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
    key.addEventListener('mouseover', mouseoverPianoKey);
    keys.forEach(key => key.addEventListener('mouseout', mouseoutPianoKey));
    keys.forEach(key => key.addEventListener('mousedown', clickPianoKey));
});
