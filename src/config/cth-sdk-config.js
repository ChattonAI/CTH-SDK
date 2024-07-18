const config = {
    chatBox: {
        width: "w-full", // Full width for both mobile and desktop
        height: "h-full", // Full height for both mobile and desktop
        backgroundColor: "bg-neutral-200",
        backgroundOpacity: "bg-opacity-75",
        borderRadius: "rounded-2xl", // Rounded corners for both mobile and desktop
        position: "fixed bottom-5 right-5" // Position for desktop
    },
    chatHeader: {
        backgroundColor: "bg-stone-300",
        height: "min-h-[48px]",
        assistantTextColor: "text-black",
        PBCTextColor: "text-zinc-800"
    },
    message: {
        textStyle: "text-zinc-800 text-sm",
    },
    userMessage: {
        backgroundColor: "bg-stone-300"
    },
    assistantMessage: {
        border: "border",
        borderColor: "border-stone-300"
    },
    chatInput: {
        height: "h-[58px]",
        backgroundColor: "bg-stone-300",
        textColor: "text-zinc-800",
        backgroundOpacity: "bg-opacity-80"
    },
    predefinedOption: {
        textColor: "text-black",
        backgroundColor: "bg-stone-300"
    }
};

export default config;