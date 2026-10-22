
const starField = document.getElementById("starField");
const starCount = document.getElementById("starCount");
const sendDialog = document.getElementById("sendDialog");
const messageDialog = document.getElementById("messageDialog");
const sendForm = document.getElementById("sendForm");
const toast = document.getElementById("toast");

const colors = ["gold", "pink", "blue", "purple"];

const messages = [
  {
    sender: "A little friend",
    message: "You are doing better than you think. Keep going, okay? ♡",
    color: "pink"
  },
  {
    sender: "Someone who cares",
    message: "I hope something lovely finds you today. You deserve it. ✨",
    color: "gold"
  },
  {
    sender: "A tiny reminder",
    message: "Rest when you need to. You don't have to do everything at once.",
    color: "purple"
  },
  {
    sender: "Your secret admirer",
    message: "The world is a little brighter because you're in it. ⭐",
    color: "blue"
  }
];

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderStars() {
  starField.replaceChildren();

  messages.forEach((item, index) => {
    const star = document.createElement("button");
    star.type = "button";
    star.className = `star ${item.color}`;
    star.textContent = "✦";
    star.setAttribute("aria-label", `Open star ${index + 1}`);

    // Spread stars around the inside of the jar.
    const positions = [
      [15, 18], [55, 14], [72, 35], [28, 42],
      [49, 55], [12, 64], [72, 70], [38, 27],
      [60, 80], [25, 80], [83, 51], [44, 68]
    ];

    const [x, y] = positions[index % positions.length];
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.animationDelay = `${index * 0.18}s`;
    star.addEventListener("click", () => openMessage(index));

    starField.appendChild(star);
  });

  starCount.textContent = `${messages.length} little stars full of love ♡`;
}

function openMessage(index) {
  const item = messages[index];

  document.getElementById("messageTitle").textContent =
    item.sender.trim() || "Someone special";

  document.getElementById("messageBody").textContent = item.message;

  const icon = document.getElementById("messageStar");
  icon.className = `message-star ${item.color}`;
  icon.textContent = "✦";

  messageDialog.showModal();
}

document.getElementById("openJarBtn").addEventListener("click", () => {
  if (messages.length === 0) {
    showToast("Your jar is waiting for its first star ♡");
    return;
  }

  const index = Math.floor(Math.random() * messages.length);
  openMessage(index);
});

document.getElementById("sendStarBtn").addEventListener("click", () => {
  sendDialog.showModal();
});

sendForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(sendForm);
  const sender = String(formData.get("sender") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const color = String(formData.get("starColor") || "gold");

  if (!message) {
    showToast("Write a little message first ♡");
    return;
  }

  if (!colors.includes(color)) {
    showToast("Please choose a valid star color.");
    return;
  }

  messages.push({
    sender: sender || "A little mystery",
    message,
    color
  });

  renderStars();
  sendForm.reset();
  sendDialog.close();
  showToast("Your little star has been added! ✨");
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.close);
    if (dialog) dialog.close();
  });
});

renderStars();

