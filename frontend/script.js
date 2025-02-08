const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const filterOverlay = document.getElementById("filter-overlay");

// Access Camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => console.error("Camera access error:", err));

// Apply Filter When Button is Clicked
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        filterOverlay.style.background = filter !== "none" ? `rgba(255,255,255,0.1)` : "transparent";
        filterOverlay.style.filter = filter;
        video.style.filter = filter;
    });
});

// Capture Snap with Filter
document.getElementById("capture-btn").addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame with filter applied
    ctx.filter = video.style.filter;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Send Snap to Backend
document.getElementById("send-btn").addEventListener("click", async () => {
    const receiver = document.getElementById("receiver").value;
    if (!receiver) {
        alert("Enter receiver username!");
        return;
    }

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);
        formData.append("sender", "User1");  // Hardcoded sender for now
        formData.append("receiver", receiver);

        const response = await fetch("http://localhost:5000/sendSnap", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        alert(data.message);
    }, "image/png");
});

// View Snaps
document.getElementById("view-snaps-btn").addEventListener("click", async () => {
    const receiver = prompt("Enter your username to view snaps:");
    if (!receiver) return;

    const response = await fetch(`http://localhost:5000/getSnaps/${receiver}`);
    const snaps = await response.json();

    const snapsContainer = document.getElementById("snaps-container");
    snapsContainer.innerHTML = "";
    
    snaps.forEach(snap => {
        const img = document.createElement("img");
        img.src = snap.imageUrl;
        img.width = 200;
        img.height = 250;
        
        // Mark as viewed when clicked
        img.addEventListener("click", async () => {
            await fetch(`http://localhost:5000/viewSnap/${snap._id}`, { method: "POST" });
            alert("Snap viewed!");
            img.remove(); // Remove snap after viewing
        });

        snapsContainer.appendChild(img);
    });
});
