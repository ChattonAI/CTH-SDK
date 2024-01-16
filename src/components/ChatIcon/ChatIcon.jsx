import React, { useState } from 'react';
import ChatBox from './ChatBox/ChatBox.jsx';

const ChatIcon = ({ predefinedMessages }) => {
    const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
    const [showPredefined, setShowPredefined] = useState(true);
    const [messages, setMessages] = useState([]);

    

    const toggleChatBox = () => {
        setIsChatBoxVisible(!isChatBoxVisible);
    };

    const hidePredefinedMessages = () => {
        setShowPredefined(false); // Hide predefined messages once a message is sent
    };

    return (
        <>
            <div 
                className={`chat-icon ${isChatBoxVisible ? 'chat-box-slide-out' : 'chat-box-slide-and-bounce'}`} 
                onClick={toggleChatBox}>
                {/* Removed the inner div with the "chat-icon" class */}
            </div>
            {isChatBoxVisible && (
                <ChatBox
                    isVisible={isChatBoxVisible}
                    onClose={toggleChatBox}
                    predefinedMessages={predefinedMessages}
                    showPredefinedOptions={showPredefined}
                    onHidePredefined={hidePredefinedMessages}
                    messages={messages}
                    setMessages={setMessages}
                />
            )}
        </>
    );
};

export default ChatIcon;