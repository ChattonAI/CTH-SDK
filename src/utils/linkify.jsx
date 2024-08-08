import React from 'react';

// Styles for the links
const linkStyle = {
    color: '#0000EE',  // Standard link blue color
    textDecoration: 'underline',
    cursor: 'pointer'
};

// Helper function to turn Markdown links into React elements
const linkify = (text) => {
    if (text === undefined) {
        return []; // Return an empty array or some default value
    }

    // Regular expression to match Markdown links
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    let lastIndex = 0;
    const elements = [];

    // Find all matches
    let match;
    while ((match = linkRegex.exec(text)) !== null) {
        // Add the text before the link
        if (match.index > lastIndex) {
            elements.push(text.slice(lastIndex, match.index));
        }

        // Add the link
        elements.push(
            <a 
                key={match.index} 
                href={match[2]} 
                target="_blank" 
                rel="noopener noreferrer"
                style={linkStyle}
            >
                {match[1]}
            </a>
        );

        lastIndex = match.index + match[0].length;
    }

    // Add any remaining text after the last link
    if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
    }

    return elements;
};

// React component to display linkified text safely
const LinkifiedText = ({ text }) => {
    return <div>{linkify(text)}</div>;
};

export default LinkifiedText;