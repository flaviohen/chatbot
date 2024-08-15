// script.js
document.getElementById('send-button').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('Você', userInput);
    document.getElementById('user-input').value = '';

    const response = await getChatbotResponse(userInput);
    appendMessage('Chatbot', response);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getChatbotResponse(userInput) {
    const documentText = await fetch('https://flaviohen.github.io/chatbot/document.txt').then(response => response.text());
    const prompt = `Documento: ${documentText}\n\nPergunta: ${userInput}\nResposta:`;

    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    }).then(response => response.json());

    return response.choices[0].text.trim();
}