const socket = io("https://dot-camera-countrol-app.onrender.com"); // Change if needed

const dots = [
  { id: "dot1", toggle: "toggle1", event: "dot1Toggle" },
  { id: "dot2", toggle: "toggle2", event: "dot2Toggle" },
  { id: "dot3", toggle: "toggle3", event: "dot3Toggle" },
];

dots.forEach(({ id, toggle, event }) => {
  const dot = document.getElementById(id);
  const toggleEl = document.getElementById(toggle);

  toggleEl.addEventListener("change", () => {
    const isOn = toggleEl.checked;
    socket.emit(event, isOn);
    dot.style.backgroundColor = isOn ? "white" : "black";
  });

  socket.on(event, (isOn) => {
    dot.style.backgroundColor = isOn ? "white" : "black";
    document.getElementById(toggle).checked = isOn;
  });
});

const camToggle = document.getElementById("camToggle");
const video = document.getElementById("video");

camToggle.addEventListener("change", async () => {
  const isOn = camToggle.checked;
  socket.emit("cameraToggle", isOn);
  handleCamera(isOn);
});

socket.on("cameraToggle", (isOn) => {
  camToggle.checked = isOn;
  handleCamera(isOn);
});

async function handleCamera(isOn) {
  if (isOn) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = "block";
  } else {
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
    video.style.display = "none";
  }
    }
