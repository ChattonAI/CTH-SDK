// JavaScript for adjusting the chatbox size and position dynamically
function adjustChatboxSize() {
    const chatbox = document.querySelector('.chat-box');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (viewportWidth < 450 || viewportHeight < 660) {
        chatbox.style.width = 'calc(100% - 10px)';
        chatbox.style.height = 'calc(100% - 10px)';
        chatbox.style.right = '5px';
        chatbox.style.bottom = '5px';
    } else {
        chatbox.style.width = '350px';
        chatbox.style.height = '500px';
        chatbox.style.right = '60px';
        chatbox.style.bottom = '60px';
    }
}

function handleKeyboard() {
    const chatbox = document.querySelector('.chat-box');
    const messageListContainer = document.querySelector('.message-list-container');
    const keyboardVisible = window.innerHeight < 660;

    if (keyboardVisible) {
        chatbox.style.bottom = '10px';
        messageListContainer.style.maxHeight = 'calc(80vh - 100px)'; // Adjust max-height to make input visible
    } else {
        chatbox.style.bottom = '60px';
        messageListContainer.style.maxHeight = '700px';
    }
}

window.addEventListener('resize', adjustChatboxSize);
window.addEventListener('load', adjustChatboxSize);
window.addEventListener('resize', handleKeyboard);
