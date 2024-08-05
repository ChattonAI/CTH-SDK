const config = {
    mode: "dark",
    chatBox: {
        width: "w-full", // Full width for both mobile and desktop
        height: "h-full", // Full height for both mobile and desktop
        backgroundColor: "bg-neutral-900",
        backgroundOpacity: "bg-opacity-75",
        borderRadius: "rounded-2xl", // Rounded corners for both mobile and desktop
        position: "fixed bottom-5 right-5" // Position for desktop
    },
    chatHeader: {
        backgroundColor: "bg-zinc-800",
        height: "min-h-[48px]",
        assistantTextColor: "text-white",
        PBCTextColor: "text-neutral-400",
        iconColor: "../../Images/exit.svg"
    },
    message: {
        textStyle: "text-neutral-400 text-sm",
    },
    userMessage: {
        backgroundColor: "bg-zinc-800"
    },
    assistantMessage: {
        border: "border",
        borderColor: "border-zinc-800"
    },
    chatInput: {
        height: "h-[58px]",
        backgroundColor: "border-zinc-800",
        textColor: "text-neutral-400",
        backgroundOpacity: "bg-opacity-80",
        sendIcon: "../../Images/black-send.svg'"
    },
    predefinedOption: {
        textColor: "text-black",
        backgroundColor: "bg-zinc-800"
    }
};

export default config;