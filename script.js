document.addEventListener("DOMContentLoaded", () => {
    const windows = document.querySelectorAll(".window");
    const icons = document.querySelectorAll(".desktop-icon");
    const taskbar = document.getElementById("taskbar");
    const taskbarClock = document.getElementById("taskbar-clock");
    const startButton = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");
    const taskbarButtons = {};

    // 🕒 Update Clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        taskbarClock.textContent = timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 🪟 Make Windows Draggable
    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        let offsetX, offsetY, isDragging = false;

        titleBar.addEventListener("mousedown", e => {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            win.style.zIndex = 1000;
        });

        document.addEventListener("mousemove", e => {
            if (isDragging) {
                win.style.left = `${e.clientX - offsetX}px`;
                win.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    });

    // 📂 Desktop Icons to Open Windows
    icons.forEach(icon => {
        icon.addEventListener("dblclick", () => {
            const windowId = icon.id.replace("-icon", "-window");
            const win = document.getElementById(windowId);
            if (win) {
                win.style.display = "block";
                win.style.zIndex = 1000;

                if (!taskbarButtons[windowId]) {
                    const btn = document.createElement("button");
                    btn.className = "taskbar-app-button";
                    btn.textContent = win.querySelector(".title").textContent;

                    btn.addEventListener("click", () => {
                        win.style.display = win.style.display === "none" ? "block" : "none";
                    });

                    taskbar.insertBefore(btn, taskbarClock);
                    taskbarButtons[windowId] = btn;
                }
            }
        });
    });

    // ❌ Close & ➖ Minimize Windows
    windows.forEach(win => {
        const closeBtn = win.querySelector(".close");
        const minBtn = win.querySelector(".minimize");
        const windowId = win.id;

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                win.style.display = "none";
                if (taskbarButtons[windowId]) {
                    taskbarButtons[windowId].remove();
                    delete taskbarButtons[windowId];
                }
            });
        }

        if (minBtn) {
            minBtn.addEventListener("click", () => {
                win.style.display = "none";
            });
        }
    });

    // 🎵 Music Player Logic
    const audio = document.getElementById("music-audio");
    const playBtn = document.getElementById("play-music");
    const pauseBtn = document.getElementById("pause-music");
    const nextBtn = document.getElementById("next-music");
    const prevBtn = document.getElementById("prev-music");
    const songTitle = document.getElementById("song-title");

    const playlist = [
        { title: "Track 1 - Cool Vibes", src: "music/song1.mp3" },
        { title: "Track 2 - Dreamy Tune", src: "music/song2.mp3" },
        { title: "Track 3 - Y2K Jam", src: "music/song3.mp3" }
    ];

    let currentTrack = 0;

    function loadTrack(index) {
        if (!audio) return;
        const track = playlist[index];
        audio.src = track.src;
        if (songTitle) songTitle.textContent = track.title;
    }

    if (audio) {
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
    }

    // 🟦 Start Menu Toggle
    if (startButton && startMenu) {
        startButton.addEventListener("click", () => {
            startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (e) => {
            if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
                startMenu.style.display = "none";
            }
        });
    }
});