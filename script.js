// ====== BIO WINDOW ======
const windowEl = document.getElementById("bio-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const minimizeBtn = windowEl.querySelector(".minimize");
const bioIcon = document.getElementById("bio-icon");

const startButton = document.getElementById('start-button');
const startMenu = document.getElementById('start-menu');

const clockEl = document.getElementById("taskbar-clock");
const taskbarApps = document.getElementById("taskbar-apps");

let bioTaskbarBtn = null;

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  clockEl.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

bioIcon.addEventListener("dblclick", () => {
  windowEl.style.display = "block";
  windowEl.style.zIndex = Date.now();

  if (!bioTaskbarBtn) {
    bioTaskbarBtn = document.createElement("div");
    bioTaskbarBtn.className = "taskbar-app active";
    bioTaskbarBtn.textContent = "My Bio";
    taskbarApps.appendChild(bioTaskbarBtn);

    bioTaskbarBtn.addEventListener("click", () => {
      if (windowEl.style.display === "none") {
        windowEl.style.display = "block";
        windowEl.style.zIndex = Date.now();
        bioTaskbarBtn.classList.add("active");
      } else {
        windowEl.style.display = "none";
        bioTaskbarBtn.classList.remove("active");
      }
    });
  } else {
    bioTaskbarBtn.classList.add("active");
  }
});

closeBtn.addEventListener("click", () => {
  windowEl.style.display = "none";
  if (bioTaskbarBtn) {
    bioTaskbarBtn.remove();
    bioTaskbarBtn = null;
  }
});

minimizeBtn.addEventListener("click", () => {
  windowEl.style.display = "none";
  if (bioTaskbarBtn) bioTaskbarBtn.classList.remove("active");
});

windowEl.style.display = "none";

// ====== START MENU ======
startButton.addEventListener('click', () => {
  startMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!startMenu.contains(e.target) && e.target !== startButton) {
    startMenu.classList.add('hidden');
  }
});

// ====== MUSIC PLAYER WINDOW ======
const musicWindow = document.getElementById("music-window");
const musicTitleBar = musicWindow.querySelector(".title-bar");
const musicCloseBtn = musicWindow.querySelector(".close");
const musicMinimizeBtn = musicWindow.querySelector(".minimize");
let musicTaskbarBtn = null;

const audio = document.getElementById("music-audio");
const playBtn = document.getElementById("play-music");
const pauseBtn = document.getElementById("pause-music");
const nextBtn = document.getElementById("next-music");
const prevBtn = document.getElementById("prev-music");
const songTitle = document.getElementById("song-title");

const playlist = [
  { title: "HUNTRIX - GOLDEN", src: "audio/HUNTRIX - GOLDEN.mp3" },
];

let currentTrack = 0;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  songTitle.textContent = track.title;
}

loadTrack(currentTrack);

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});

if (playBtn) playBtn.addEventListener("click", () => audio.play());
if (pauseBtn) pauseBtn.addEventListener("click", () => audio.pause());
if (nextBtn) nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});
if (prevBtn) prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
});

// Drag music window
let isDraggingMusic = false;
let musicOffsetX = 0;
let musicOffsetY = 0;

musicTitleBar.addEventListener("mousedown", (e) => {
  isDraggingMusic = true;
  musicOffsetX = e.clientX - musicWindow.offsetLeft;
  musicOffsetY = e.clientY - musicWindow.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDraggingMusic) {
    musicWindow.style.left = `${e.clientX - musicOffsetX}px`;
    musicWindow.style.top = `${e.clientY - musicOffsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDraggingMusic = false;
});

// Taskbar logic
const mediaIcon = document.getElementById("media-icon");
mediaIcon.addEventListener("dblclick", () => {
  musicWindow.style.display = "block";
  musicWindow.style.zIndex = Date.now();

  if (!musicTaskbarBtn) {
    musicTaskbarBtn = document.createElement("div");
    musicTaskbarBtn.className = "taskbar-app active";
    musicTaskbarBtn.textContent = "Music";
    taskbarApps.appendChild(musicTaskbarBtn);

    musicTaskbarBtn.addEventListener("click", () => {
      if (musicWindow.style.display === "none") {
        musicWindow.style.display = "block";
        musicWindow.style.zIndex = Date.now();
        musicTaskbarBtn.classList.add("active");
      } else {
        musicWindow.style.display = "none";
        musicTaskbarBtn.classList.remove("active");
      }
    });
  } else {
    musicTaskbarBtn.classList.add("active");
  }
});

musicCloseBtn.addEventListener("click", () => {
  musicWindow.style.display = "none";
  audio.pause(); // 🚨 stop the audio
  audio.currentTime = 0; // ⏮️ rewind to start (optional)

  if (musicTaskbarBtn) {
    musicTaskbarBtn.remove();
    musicTaskbarBtn = null;
  }
});

musicMinimizeBtn.addEventListener("click", () => {
  musicWindow.style.display = "none";
  if (musicTaskbarBtn) musicTaskbarBtn.classList.remove("active");
});

musicWindow.style.display = "none";

// Start menu → Music Player
const startMusicBtn = document.getElementById("start-music-btn");

if (startMusicBtn) {
  startMusicBtn.addEventListener("click", () => {
    musicWindow.style.display = "block";
    musicWindow.style.zIndex = Date.now();
    startMenu.classList.add("hidden"); // hide start menu after click

    if (!musicTaskbarBtn) {
      musicTaskbarBtn = document.createElement("div");
      musicTaskbarBtn.className = "taskbar-app active";
      musicTaskbarBtn.textContent = "Music";
      taskbarApps.appendChild(musicTaskbarBtn);

      musicTaskbarBtn.addEventListener("click", () => {
        if (musicWindow.style.display === "none") {
          musicWindow.style.display = "block";
          musicWindow.style.zIndex = Date.now();
          musicTaskbarBtn.classList.add("active");
        } else {
          musicWindow.style.display = "none";
          musicTaskbarBtn.classList.remove("active");
        }
      });
    } else {
      musicTaskbarBtn.classList.add("active");
    }
  });
}