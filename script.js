ldocument.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".desktop-icon");
    const windows = document.querySelectorAll(".window");
    const taskbar = document.getElementById("taskbar");
    const clock = document.getElementById("taskbar-clock");
    const startButton = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");
    const taskbarButtons = {};

    // Update clock every second
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Open windows when icon is double clicked
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

                    taskbar.insertBefore(btn, clock);
                    taskbarButtons[windowId] = btn;
                }
            }
        });
    });

    // Close and minimize buttons
    windows.forEach(win => {
        const closeBtn = win.querySelector(".close");
        const minimizeBtn = win.querySelector(".minimize");
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

        if (minimizeBtn) {
            minimizeBtn.addEventListener("click", () => {
                win.style.display = "none";
            });
        }

        // Make windows draggable
        const titleBar = win.querySelector(".title-bar");
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

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

    // Start menu toggle
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

    // Music player
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
        const track = playlist[index];
        audio.src = track.src;
        songTitle.textContent = track.title;
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
});