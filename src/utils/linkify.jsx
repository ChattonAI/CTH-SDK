import React from 'react';

// Helper function to turn Markdown links into React elements
const linkify = (text) => {
        if (text === undefined) {
        return []; // Return an empty array or some default value
    }
    console.log("linkify text: ", text);
    const extendedMarkdownLinkRegex =
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*(?:【\d+†source】)?/gi;

    // Split the text into parts separated by Markdown links
    const parts = text.split(extendedMarkdownLinkRegex);

    // Construct a sequence of strings and link elements
    const elements = [];
    for (let i = 0; i < parts.length; i += 3) {
        elements.push(parts[i]); // Regular text
        if (i + 1 < parts.length && i + 2 < parts.length) {
            // Markdown link detected, create a React element
            elements.push(
                <a key={i} href={parts[i + 2]} target="_blank" rel="noopener noreferrer">
                    {parts[i + 1]}
                </a>
            );
        }
    }

    // Return an array of strings and JSX elements which React can render
    return elements;
};

// React component to display linkified text safely
const LinkifiedText = ({ text }) => {
    return <div>{linkify(text)}</div>;
};

export default LinkifiedText;