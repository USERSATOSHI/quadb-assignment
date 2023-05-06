const progressRingCircle = document.getElementById("progressRingCircle");
let globalTime = 60;
const timer = () => {
    if (globalTime > 0) {
        globalTime--;
        timertext.innerHTML = globalTime;
    } else {
        globalTime = 60;
        updateTickers();
        timertext.innerHTML = globalTime;
    }
    progressRingCircle.style.setProperty(
        "stroke-dashoffset",
        125.6 * (1 - globalTime / 60),
    );
};

document.addEventListener("DOMContentLoaded", () => {
    setInterval(timer, 1000);
});
