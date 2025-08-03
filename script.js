let topZ = 100; // persistent z-index counter

// ====== BIO WINDOW ======
const windowEl = document.getElementById("bio-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const minimizeBtn = windowEl.querySelector(".minimize");
const bioIcon = document.getElementById("bio-icon");

function bringToFront(win) {
  document.querySelectorAll('.window').forEach(w => {
    w.classList.remove('active');
    w.classList.add('inactive');
  });

  win.classList.remove('inactive');
  win.classList.add('active');
  win.style.zIndex = ++topZ;
}

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
  bringToFront(windowEl);

  if (!bioTaskbarBtn) {
    bioTaskbarBtn = document.createElement("div");
    bioTaskbarBtn.className = "taskbar-app active";
    bioTaskbarBtn.textContent = "My Bio";
    taskbarApps.appendChild(bioTaskbarBtn);

    bioTaskbarBtn.addEventListener("click", () => {
      if (windowEl.style.display === "none") {
        windowEl.style.display = "block";
        bringToFront(windowEl);
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

// PaintPad App
const paintIcon = document.getElementById("paint-icon");
const paintWindow = document.getElementById("paint-window");
const paintTitleBar = paintWindow.querySelector(".title-bar");
const paintCloseBtn = paintWindow.querySelector(".close");
const paintMinimizeBtn = paintWindow.querySelector(".minimize");
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const clearCanvasBtn = document.getElementById("clearCanvas");

let isPainting = false;
let paintTaskbarBtn = null;

paintIcon.addEventListener("dblclick", () => {
  paintWindow.style.display = "block";
  bringToFront(paintWindow);

  if (!paintTaskbarBtn) {
    paintTaskbarBtn = document.createElement("div");
    paintTaskbarBtn.className = "taskbar-app active";
    paintTaskbarBtn.textContent = "PaintPad";
    taskbarApps.appendChild(paintTaskbarBtn);

    paintTaskbarBtn.addEventListener("click", () => {
      if (paintWindow.style.display === "none") {
        paintWindow.style.display = "block";
        bringToFront(paintWindow);
        paintTaskbarBtn.classList.add("active");
      } else {
        paintWindow.style.display = "none";
        paintTaskbarBtn.classList.remove("active");
      }
    });
  } else {
    paintTaskbarBtn.classList.add("active");
  }
});

// Draw on canvas
canvas.addEventListener("mousedown", () => isPainting = true);
canvas.addEventListener("mouseup", () => isPainting = false);
canvas.addEventListener("mouseleave", () => isPainting = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!isPainting) return;
  const rect = canvas.getBoundingClientRect();
  ctx.fillStyle = colorPicker.value;
  ctx.beginPath();
ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 2, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();
}

// Clear canvas
clearCanvasBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Close and minimize
paintCloseBtn.addEventListener("click", () => {
  paintWindow.style.display = "none";
  if (paintTaskbarBtn) {
    paintTaskbarBtn.remove();
    paintTaskbarBtn = null;
  }
});

paintMinimizeBtn.addEventListener("click", () => {
  paintWindow.style.display = "none";
  if (paintTaskbarBtn) paintTaskbarBtn.classList.remove("active");
});

// Drag
paintTitleBar.addEventListener("mousedown", function (e) {
  const offsetX = e.clientX - paintWindow.offsetLeft;
  const offsetY = e.clientY - paintWindow.offsetTop;

  function dragMove(e) {
    paintWindow.style.left = `${e.clientX - offsetX}px`;
    paintWindow.style.top = `${e.clientY - offsetY}px`;
  }

  document.addEventListener("mousemove", dragMove);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", dragMove);
  }, { once: true });
});

// Notepad App
const notepadIcon = document.getElementById("notepad-icon");
const notepadWindow = document.getElementById("notepad-window");
notepadWindow.style.display = "none";
const notepadTitleBar = notepadWindow.querySelector(".title-bar");
const notepadCloseBtn = notepadWindow.querySelector(".close");
const notepadMinimizeBtn = notepadWindow.querySelector(".minimize");
const notepadText = document.getElementById("notepad-text");
const saveBtn = document.getElementById("save-note");
const clearBtn = document.getElementById("clear-note");

let notepadTaskbarBtn = null;

// Open from desktop
notepadIcon.addEventListener("dblclick", () => {
  notepadWindow.style.display = "block";
  bringToFront(notepadWindow);

  if (!notepadTaskbarBtn) {
    notepadTaskbarBtn = document.createElement("div");
    notepadTaskbarBtn.className = "taskbar-app active";
    notepadTaskbarBtn.textContent = "Notepad";
    taskbarApps.appendChild(notepadTaskbarBtn);

    notepadTaskbarBtn.addEventListener("click", () => {
      if (notepadWindow.style.display === "none") {
        notepadWindow.style.display = "none";
        bringToFront(notepadWindow);
        notepadTaskbarBtn.classList.add("active");
      } else {
        notepadWindow.style.display = "none";
        notepadTaskbarBtn.classList.remove("active");
      }
    });
  } else {
    notepadTaskbarBtn.classList.add("active");
  }
});

// Minimize / Close
notepadCloseBtn.addEventListener("click", () => {
  notepadWindow.style.display = "none";
  if (notepadTaskbarBtn) {
    notepadTaskbarBtn.remove();
    notepadTaskbarBtn = null;
  }
});

notepadMinimizeBtn.addEventListener("click", () => {
  notepadWindow.style.display = "none";
  if (notepadTaskbarBtn) notepadTaskbarBtn.classList.remove("active");
});

// Dragging
notepadTitleBar.addEventListener("mousedown", function (e) {
  const offsetX = e.clientX - notepadWindow.offsetLeft;
  const offsetY = e.clientY - notepadWindow.offsetTop;

  function dragMove(e) {
    notepadWindow.style.left = `${e.clientX - offsetX}px`;
    notepadWindow.style.top = `${e.clientY - offsetY}px`;
  }

  document.addEventListener("mousemove", dragMove);

  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", dragMove);
  }, { once: true });
});

// Save / Clear functionality
saveBtn.addEventListener("click", () => {
  localStorage.setItem("notepadText", notepadText.value);
  alert("Note saved!");
});

clearBtn.addEventListener("click", () => {
  notepadText.value = "";
  localStorage.removeItem("notepadText");
});

// Load saved note
window.addEventListener("load", () => {
  const saved = localStorage.getItem("notepadText");
  if (saved) notepadText.value = saved;
});

// Taskbar logic
const mediaIcon = document.getElementById("media-icon");
mediaIcon.addEventListener("dblclick", () => {
  musicWindow.style.display = "block";
  bringToFront(musicWindow);

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

const allWindows = document.querySelectorAll('.window');

// Attach focus event to all windows
document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => {
    bringToFront(win);
  });
});

// Start menu → Music Player
const startMusicBtn = document.getElementById("start-music-btn");

if (startMusicBtn) {
  startMusicBtn.addEventListener("click", () => {
    musicWindow.style.display = "block";
    bringToFront(musicWindow);
    startMenu.classList.add("hidden"); // hide start menu after click

    if (!musicTaskbarBtn) {
      musicTaskbarBtn = document.createElement("div");
      musicTaskbarBtn.className = "taskbar-app active";
      musicTaskbarBtn.textContent = "Music";
      taskbarApps.appendChild(musicTaskbarBtn);

      musicTaskbarBtn.addEventListener("click", () => {
        if (musicWindow.style.display === "none") {
          musicWindow.style.display = "block";
          bringToFront(musicWindow);
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
