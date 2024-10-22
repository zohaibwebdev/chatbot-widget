// Create chatbot.js
(function() {
    let userName = '';
    const scriptTag = document.currentScript;
    userName = scriptTag.getAttribute('data-username') || 'Guest'; 
    // CSS styles
    const styles = `
        .chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            font-family: Arial, sans-serif;
        }

        .chat-button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .chat-container {
            display: none;
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            flex-direction: column;
        }

        .chat-header {
            background: #007bff;
            color: white;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .close-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 20px;
        }

        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
        }

        .chat-input-container {
            padding: 15px;
            border-top: 1px solid #eee;
            display: flex;
        }

        .chat-input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-right: 8px;
        }

        .send-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
        }

        .message {
            margin-bottom: 10px;
            padding: 8px 12px;
            border-radius: 15px;
            max-width: 80%;
            word-wrap: break-word;
        }

        .user-message {
            background: #007bff;
            color: white;
            margin-left: auto;
        }

        .bot-message {
            background: #e9ecef;
            color: black;
        }
    `;

    // Create and inject stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create chat widget HTML
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
        <div class="chat-container">
            <div class="chat-header">
                <span>Code Analytics</span>
                <button class="close-btn">&times;</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input-container">
                <input type="text" class="chat-input" placeholder="Type your message...">
                <button class="send-btn">Send</button>
            </div>
        </div>
    `;

    // Add widget to page
    document.body.appendChild(chatWidget);

    // Get elements
    const chatButton = chatWidget.querySelector('.chat-button');
    const chatContainer = chatWidget.querySelector('.chat-container');
    const closeButton = chatWidget.querySelector('.close-btn');
    const input = chatWidget.querySelector('.chat-input');
    const sendButton = chatWidget.querySelector('.send-btn');
    const messagesContainer = chatWidget.querySelector('.chat-messages');

    // Toggle chat
    let isOpen = false;
    function toggleChat() {
        isOpen = !isOpen;
        chatContainer.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) input.focus();
    }

    // Send message
    function sendMessage() {
        const message = input.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');
            
            // Clear input
            input.value = '';
            
            // Add bot response (customize this part)
            setTimeout(() => {
                addMessage(`Hi, ${userName} This is a demo response from the bot.`, 'bot-message');
            }, 500);
        }
    }

    // Add message to chat
    function addMessage(text, className) {
        const message = document.createElement('div');
        message.className = `message ${className}`;
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Event listeners
    chatButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
})();
