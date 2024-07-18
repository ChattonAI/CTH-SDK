# CTH-SDK

CTH-SDK is a comprehensive solution for integrating advanced chatbot functionalities into your web applications. This SDK is designed to be flexible and customisable, allowing for a wide range of use cases.

## Important Notice

While modifications and customisations to the SDK are permitted, it is required that all implementations of the CTH-SDK visibly display "POWERED BY CHATTONAI" with a hyperlink to [ChattonAI's website](https://chattonai.com), within the chat box's UI. This attribution must be preserved in any version of the SDK that is used publicly.

## Installation

### Via NPM

You can install the CTH-SDK via NPM. This is the recommended method for ease of installation and updates.

```bash
npm install cth-sdk
```

### Manual Installation

Alternatively, you can clone the repository and build the SDK manually:

```bash
git clone https://github.com/ChattonAI/CTH-SDK.git
cd CTH-SDK
npm install
npm run build
```

This will generate a `bundle.js` file in your directory, which you can then include in your web projects.

## Usage

To host locally run:

```npm start```

After installation, you can initialise and use the SDK in your JavaScript code as follows:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  if (window.ChattonAI_Chatbot_SDK) {
    window.ChattonAI_Chatbot_SDK.init({
      // Your initialization parameters
      businessId: "business001",
      predefinedMessages: ["Hello!", "How much is shipping?", "Help me pick a poster", "Album posters"]
    });
  }
});
```

For detailed usage instructions and customisation options, please refer to our [documentation](documentation.chattonai.com).

## Customising

CTH-SDK allows for extensive customisation to fit your specific requirements. To learn more about how you can customise the chatbox, please refer to our [detailed documentation](documentation.chattonai.com).

## Contributing

Contributions to CTH-SDK are welcome. Please ensure that your code adheres to our contribution guidelines and code of conduct.

## License

CTH-SDK is released under [Apache license 2.0], which allows for modification and redistribution with the requirement of attribution.
