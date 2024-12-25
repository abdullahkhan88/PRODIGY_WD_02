let stopwatch = document.getElementById("stopwatch");
let startPauseBtn = document.getElementById("startPauseBtn");
let lapBtn = document.getElementById("lapBtn");
let resetBtn = document.getElementById("resetBtn");
let lapsContainer = document.getElementById("laps");

let timerInterval;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
            .toString()
            .padStart(2, "0")}`;
}

function updateStopwatch() {
    elapsedTime += 10;
    stopwatch.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
        lapBtn.disabled = true;
    } else {
        timerInterval = setInterval(updateStopwatch, 10);
        startPauseBtn.textContent = "Pause";
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
    resetBtn.disabled = false;
});

lapBtn.addEventListener("click", () => {
    let lapTime = document.createElement("div");
    lapTime.className = "lap";
    lapTime.textContent = `Lap: ${formatTime(elapsedTime)}`;
    lapsContainer.appendChild(lapTime);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    stopwatch.textContent = "00:00:00.00";
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsContainer.innerHTML = "";
});



