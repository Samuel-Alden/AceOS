const windowEl = document.getElementById("bio-window");
const titleBar = windowEl.querySelector(".title-bar");
const closeBtn = windowEl.querySelector(".close");
const minimizeBtn = windowEl.querySelector(".minimize");
const bioIcon = document.getElementById("bio-icon");

const startBtn = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");

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

startBtn.addEventListener("click", () => {
  const isVisible = !startMenu.classList.contains("hidden");
  document.querySelectorAll("#start-menu").forEach(menu => menu.classList.add("hidden"));
  if (!isVisible) startMenu.classList.remove("hidden");
})

document.addEventListener("click", (e) => {
  if (!startBtn.contains(e.target) && !startMenu.contains(e.target)) {
    startMenu.classList.add("hidden");
  }
});
