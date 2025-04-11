particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 2 },
    color: { value: "#ffffff" },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    }
  }
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}

function updateHistory(url) {
  const history = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
  history.unshift(url);
  localStorage.setItem("downloadHistory", JSON.stringify(history));
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function downloadVideo() {
  const url = document.getElementById('tiktokUrl').value;
  if (!url.includes("tiktok.com")) return alert("Link tidak valid.");
  updateHistory(url);
  showToast("Link disalin & membuka SnapTik...");
  navigator.clipboard.writeText(url);
  window.open(`https://snaptik.app/ID?url=${encodeURIComponent(url)}`, "_blank");
  document.getElementById("preview").classList.remove("hidden");
  document.getElementById("thumbnail").src = "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
  document.getElementById("videoTitle").textContent = "Judul Video (simulasi)";
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), url);
}

function downloadMP3() {
  const url = document.getElementById('tiktokUrl').value;
  if (!url.includes("tiktok.com")) return alert("Link tidak valid.");
  showToast("Mengalihkan ke SSSTik untuk unduh MP3...");
  window.open(`https://ssstik.io/id?url=${encodeURIComponent(url)}`, "_blank");
}

function share(platform) {
  const url = encodeURIComponent(document.getElementById('tiktokUrl').value);
  if (!url) return showToast("Isi link dulu!");
  let shareUrl = "#";
  if (platform === "wa") shareUrl = `https://wa.me/?text=${url}`;
  else if (platform === "tg") shareUrl = `https://t.me/share/url?url=${url}`;
  else if (platform === "x") shareUrl = `https://x.com/intent/tweet?text=${url}`;
  window.open(shareUrl, "_blank");
}

document.body.addEventListener('paste', e => {
  const paste = e.clipboardData.getData('text');
  if (paste.includes("tiktok.com")) {
    document.getElementById("tiktokUrl").value = paste;
    showToast("Link TikTok terdeteksi dari clipboard!");
  }
});

updateHistory();
