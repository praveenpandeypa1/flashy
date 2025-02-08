const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for Image Uploads (Uploads to Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "snaps", // Folder in Cloudinary
    format: async () => "png", // Store as PNG
  },
});
const upload = multer({ storage });

// Define Snap Schema (MongoDB Model)
const SnapSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  imageUrl: String,
  timestamp: { type: Date, default: Date.now },
  viewed: { type: Boolean, default: false },
});

const Snap = mongoose.model("Snap", SnapSchema);

// Route to check if the server is running
app.get("/", (req, res) => {
  res.send("🚀 Snapchat Backend is Running!");
});

// Route to Send Snap (Frontend will send an image & user info)
app.post("/sendSnap", upload.single("image"), async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const newSnap = new Snap({
      sender,
      receiver,
      imageUrl: req.file.path, // Cloudinary image URL
    });
    await newSnap.save();
    res.status(200).json({ message: "✅ Snap sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to Get Snaps for a User
app.get("/getSnaps/:receiver", async (req, res) => {
  try {
    const { receiver } = req.params;
    const snaps = await Snap.find({ receiver, viewed: false });
    res.status(200).json(snaps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to Mark Snap as Viewed
app.post("/viewSnap/:id", async (req, res) => {
  try {
    await Snap.findByIdAndUpdate(req.params.id, { viewed: true });
    res.status(200).json({ message: "✅ Snap marked as viewed." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
