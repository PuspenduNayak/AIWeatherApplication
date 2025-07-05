const apiKey = OPENWEATHER_API_KEY; // Replace with your OpenWeatherMap API key
const apiKeyGemini = GEMINI_API_KEY; // Replace with your OpenWeatherMap API key
const weatherDiv = document.getElementById("weather");
let tempWeather = null;
const conversationHistory = [];

const weatherEmoji = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "💨",
    Haze: "🌫️",
    Dust: "🌪️",
    Fog: "🌁",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "🌬️",
    Tornado: "🌪️"
};

function getWeatherEmoji(main) {
    return weatherEmoji[main] || "🌈";
}

function showWeather(data) {
    const name = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const desc = data.weather[0].description;
    const main = data.weather[0].main;
    const emoji = getWeatherEmoji(main);
    tempWeather = data;

    weatherDiv.innerHTML = `
    <h2>${name}, ${country}</h2>
    <div class="emoji">${emoji}</div>
    <div class="temp">${temp}°C</div>
    <div class="details">${desc}</div>

    <div class="extra-details">
      <div class="column">
        <p>🤗 Feels Like: ${feelsLike}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
      </div>
      <div class="column">
        <p>💨 Wind Speed: ${windSpeed} m/s</p>
        <p>📈 Pressure: ${pressure} hPa</p>
      </div>
    </div>
  `;
}

function showError(message) {
    weatherDiv.innerHTML = `<p>Error: ${message}</p>`;
}

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.cod === 200) {
                showWeather(data);
            } else {
                showError(data.message);
            }
        })
        .catch(() => showError("Failed to fetch weather"));
}

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            () => showError("Location access denied.")
        );
    } else {
        showError("Geolocation is not supported.");
    }
}
getLocationAndWeather();

// ---------- CHATBOT ----------

function toggleChat() {
    const chatWindow = document.getElementById("chatWindow");
    chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    conversationHistory.push({ role: "user", text });

    showTypingIndicator();

    callGeminiAPI()
        .then((aiResponse) => {
            removeTypingIndicator();
            addMessage("bot", aiResponse);
            conversationHistory.push({ role: "bot", text: aiResponse });
        })
        .catch((err) => {
            removeTypingIndicator();
            addMessage("bot", "⚠️ Error getting AI response.");
            console.error(err);
        });
}

function addMessage(sender, text) {
    const chatBody = document.getElementById("chatBody");
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<div class="chat-bubble">${formatText(text)}</div>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
    const chatBody = document.getElementById("chatBody");
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing";
    typingDiv.className = "typing";
    typingDiv.textContent = "AI is typing...";
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById("typing");
    if (typingDiv) typingDiv.remove();
}

function formatText(text) {
    // Replace bold (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace italic (*text*)
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace bullet points
    text = text.replace(/^\s*[\-*]\s+/gm, "• ");

    // Convert line breaks to <br>
    text = text.replace(/\n/g, "<br>");

    return text;
}


// 🔥 Gemini API Integration
async function callGeminiAPI() {
    let tempDetails = tempWeather
        ? `Temperature: ${Math.round(tempWeather.main.temp)}°C, ` +
        `Feels Like: ${Math.round(tempWeather.main.feels_like)}°C, ` +
        `Weather: ${tempWeather.weather[0].description}, ` +
        `Humidity: ${tempWeather.main.humidity}%, ` +
        `Location: ${tempWeather.name}, ` +
        `Country: ${tempWeather.sys.country}, ` +
        `Wind Speed: ${tempWeather.wind.speed} m/s.`
        : "Weather data not available.";

    // Build full prompt with conversation history
    const messages = conversationHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
    }));

    // Prepend context (only once at the beginning)
    messages.unshift({
        role: "user",
        parts: [{ text: `Here is the weather context: ${tempDetails}` }]
    });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKeyGemini}`;

    const payload = { contents: messages };

    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    return aiResponse;
}

