//your JS code here. If required.
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeSelectButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

// Default duration (10 minutes fallback)
let duration = 600;

// Format time into mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  // Only pad when seconds > 0 and < 10
  if (seconds === 0) {
    return `${minutes}:0`;
  } else if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}


// Play / Pause
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    play.textContent = "⏸"; // change icon to pause
  } else {
    song.pause();
    play.textContent = "▶";
  }
});

// Time select buttons
timeSelectButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    duration = parseInt(this.dataset.time) / 1000; // convert ms → sec
    timeDisplay.textContent = formatTime(duration);
    song.currentTime = 0;
    song.pause();
    play.textContent = "▶";
  });
});

// Update timer while playing
song.ontimeupdate = () => {
  const currentTime = song.currentTime;
  const elapsed = duration - currentTime;

  if (elapsed <= 0) {
    song.pause();
    song.currentTime = 0;
    play.textContent = "▶";
    timeDisplay.textContent = formatTime(duration);
  } else {
    timeDisplay.textContent = formatTime(elapsed);
  }
};

// Sound picker
soundButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("rain")) {
      song.src = "https://www.w3schools.com/html/horse.mp3"; // replace with rain audio
    } else if (btn.classList.contains("beach")) {
      song.src = "https://www.w3schools.com/html/mov_bbb.mp4"; // replace with beach audio (use audio file in real app)
    }
    song.load();
    song.pause();
    play.textContent = "▶";
  });
});