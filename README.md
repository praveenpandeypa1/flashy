# 📸 Flashy – Snapchat-Like Web App
A fast and fun way to capture, edit, and share disappearing snaps with friends. Built using HTML, CSS, JavaScript, Node.js, Express, MongoDB, and Cloudinary.

## 🚀 Features   
✅ Real-time Camera – Capture photos directly from the browser  
✅ 100+ Filters – Apply and scroll through filters before saving
✅ Send & Receive Snaps – Like Snapchat, but custom for user
✅ Self-Destructing Snaps – Snaps disappear after viewing   
✅ Cloud Storage – Securely stores snaps using Cloudinary


## 🛠 Tech Stack
- Frontend: HTML, CSS, JavaScript (Vanilla & WebRTC)
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Storage: Cloudinary (for storing snaps)

## 💻 Installation & Setup
1️⃣ Clone the repository
```
git clone https://github.com/praveenpa1/flashy.git
cd flashy
```
2️⃣ Install dependencies
```
npm install
```
3️⃣ Set up environment variables   

Create a .env file and add your MongoDB URI and Cloudinary API keys:
```
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4️⃣ Run the server
```
node server.js
```
Server runs at: http://localhost:5000

## 📌 Usage
1️⃣ Open the camera and capture a snap 📸  
2️⃣ Apply filters using the filter scroller 🎨  
3️⃣ Enter a receiver's username and send the snap ✉  
4️⃣ The receiver can view & open snaps before they disappear⏳

## 🌟 Upcoming Features
✅ Face Tracking for Stickers & AR Filters   
✅ User Authentication (Signup/Login)  
✅ Turn into a Mobile App (PWA & React Native)

## 🤝 Contributing
- Fork the repository  
- Create a new branch: git checkout -b feature-name  
- Commit changes: git commit -m "Added new feature"  
- Push to GitHub: git push origin feature-name  
- Create a Pull Request

## 📜 License
This project is open-source under the MIT License.

