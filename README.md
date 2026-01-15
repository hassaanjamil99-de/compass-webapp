# 🧭 Compass Web App

A modern, lightweight **web-based compass application** built using **HTML, CSS, and JavaScript**.  
The app uses the device’s **orientation and motion sensors** to display real-time compass heading.

🔗 **Live Demo:** https://hassaanjamil99-de.github.io/compass-webapp/

---

## ✨ Features

- Real-time compass heading
- Smooth rotating needle UI
- Modern dark-themed interface
- Works as a **Progressive Web App (PWA)**
- Mobile-friendly and responsive
- Free & open-source (no paid APIs or tools)

---

## 📱 Supported Devices

| Device | Status |
|------|------|
| Android (Chrome) | ✅ Supported |
| iPhone (Safari, HTTPS) | ✅ Supported |
| Desktop / Laptop | ⚠️ UI only (no compass sensor) |

> ⚠️ iOS requires **HTTPS** to allow motion & orientation access.

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling & layout  
- **JavaScript (ES6)** – Sensor handling & logic  
- **GitHub Pages** – Hosting (HTTPS)

---

## 🚀 How It Works

The app listens to:
- `DeviceOrientationEvent`
- `webkitCompassHeading` (iOS)

It converts sensor data into a compass heading (0°–360°) and rotates the needle accordingly.

---
📦 Project Structure
compass-webapp/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── sw.js
└── README.md
🔐 Permissions

On iPhone:

Safari will request Motion & Orientation access

HTTPS is required for sensor permissions

📌 Future Improvements

True North correction using Geolocation

Calibration indicator

Map integration

Direction labels (NE, SW, etc.)

Accessibility improvements

📄 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it.

👨‍💻 Author

Muhammad Hassaan Jamil
