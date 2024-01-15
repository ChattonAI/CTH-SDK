import React, { useState } from 'react';
import ChatBox from '/Users/neliobarbosa/Coding/chat-sdk-test/src/components/ChatBox/ChatBox.jsx';

const ChatIcon = ({ predefinedMessages }) => {
    const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
    const [showPredefined, setShowPredefined] = useState(true);
    const [messages, setMessages] = useState([]);

    const toggleChatBox = () => {
        setIsChatBoxVisible(!isChatBoxVisible);
        const toggleChatBox = () => {
            setIsChatBoxVisible(!isChatBoxVisible);
        };

    };

    const handleSendMessage = () => {
        setShowPredefined(false); // Hide predefined messages once a message is sent
    };

    return (
        <>
            <div className={`chat-icon ${isChatBoxVisible ? 'chat-box-slide-out' : 'chat-box-slide-and-bounce'}`} onClick={toggleChatBox}>
                {/* Replace with your actual image path */}
                <img
                    className="rounded-full object-cover"
                    src="https://via.placeholder.com/75x75"
                    alt="Chat Icon"
                />
            </div>
            {isChatBoxVisible && (
                <ChatBox 
                    isVisible={isChatBoxVisible}
                    onClose={toggleChatBox}
                    predefinedMessages={predefinedMessages}
                    showPredefinedOptions={showPredefined}
                    messages={messages} // Pass messages as a prop
                    onSendMessage={(content) => setMessages((prevMessages) => [...prevMessages, { text: content, isUser: true }])} // Pass onSendMessage as a prop
                />
            )}
        </>
    );
};

export default ChatIcon;