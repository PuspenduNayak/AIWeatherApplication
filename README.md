# 🌤️ Weather & AI Travel Chatbot

An elegant, fully responsive web app that:

- Shows real-time weather based on your current location using **OpenWeather API**
- Offers **AI-powered travel suggestions** using **Gemini API**
- Comes with a beautiful floating chatbot UI and weather emoji cards
- Works perfectly on **mobile and desktop**

---

## 📹 Demo

🎥 [Click here to watch the video demo](https://github.com/PuspenduNayak/AIWeatherApplication/blob/main/Assets/video/AIWeatherApplication.mp4)

> If the above video doesn’t load, you can [download it here](https://github.com/PuspenduNayak/AIWeatherApplication/blob/main/Assets/video/AIWeatherApplication.mp4))

---

## 🌐 Live Demo

👉 [**Click here to try it live**](https://aismartweatherapp.vercel.app/)


---

## ✨ Features

- 📍 Auto-detects your location
- 🌡️ Shows temperature, feels like, humidity, pressure, wind speed
- 🧠 Chatbot gives travel ideas based on weather
- 💬 Stateful chat with AI responses
- 💻📱 Fully responsive (Mobile + Desktop)
- 🎨 Emojis and modern card layout

---

## 🖼️ Screenshots

## 🖼️ Screenshots

<table>
  <tr>
    <th>Weather Card</th>
    <th>Chatbot</th>
  </tr>
  <tr>
    <td><img src="https://github.com/PuspenduNayak/AIWeatherApplication/blob/main/Assets/images/weather_cart.png?raw=true" width="300"></td>
    <td><img src="https://github.com/PuspenduNayak/AIWeatherApplication/blob/main/Assets/images/chatImage.png?raw=true" width="300"></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- OpenWeather API
- Gemini (Generative Language) API
- Vercel for hosting

---

## ⚙️ Setup Instructions

1. **Clone this repo:**

   ```bash
   git clone https://github.com/PuspenduNayak/AIWeatherApplication
   cd YOUR_REPO
   ```

2. **Create** `config.js` **from** `config.example.js`**:**

   - Copy `config.example.js` to `config.js`:

     ```bash
     cp config.example.js config.js
     ```
   - Open `config.js` and replace the placeholder API keys:

     ```javascript
     // config.js
     const OPENWEATHER_API_KEY = "your_openweather_key";
     const GEMINI_API_KEY = "your_gemini_key";
     ```

     with your actual OpenWeather and Gemini API keys.

3. **Ensure** `.gitignore` **includes** `config.js` **to protect your keys:**

   ```
   config.js
   ```

4. **Open** `index.html` **in a browser or deploy via Vercel CLI:**

   ```bash
   vercel
   ```

🔒 **Important Notes**

- `config.js` is excluded from GitHub to keep your API keys private
- Deploy with Vercel CLI to include `config.js` securely
- Keys are exposed to client — do not use for sensitive data

---

## 🧠 Powered By

- OpenWeatherMap
- Google Gemini API
- Vercel

---

## 🙌 Author

Made with 💙 by Puspendu Nayak

---

