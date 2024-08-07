import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatIcon from './components/ChatIcon/ChatIcon';
import './dist/tailwind.css';

window.ChattonAI_Chatbot_SDK = {
  init: function (options) {
    const { businessId } = options;
    // The container for the chat icon, not the chat box
    const chatIconContainerId = 'chattonai-chat-icon-container';
    let container = document.getElementById(chatIconContainerId);
    if (!container) {
      container = document.createElement('div');
      container.id = chatIconContainerId;
      document.body.appendChild(container);
    }

    // ChatBox will be rendered by ChatIcon when needed
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ChatIcon {...options} businessId={businessId} />
      </React.StrictMode>
    );
  }
};

export { ChatIcon };
