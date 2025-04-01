// Initialize map
const map = L.map('map').setView([37.7749, -122.4194], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-3 rounded-lg chat-message ${sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-800 text-white mr-auto'} max-w-xs`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function suggestActivities() {
    const userMessage = userInput.value || "Suggest activities for me";
    addMessage(userMessage, 'user');
    userInput.value = '';

    setTimeout(() => {
        addMessage("Fetching recommendations...", 'bot');
    }, 1000);
}

sendBtn.addEventListener('click', suggestActivities);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') suggestActivities();
});
