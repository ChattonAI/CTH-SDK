// cth-sdk.d.ts
declare module 'cth-sdk' {
    import { ComponentType, RefObject } from 'react';

    // ChatHeader component
    export interface ChatHeaderProps {
        onClose: () => void;
    }

    export const ChatHeader: ComponentType<ChatHeaderProps>;

    // MessageList component
    export interface MessageListProps {
        messages: Array<{ text: string; isUser: boolean }>;
        isTyping?: boolean;
        messageListRef?: React.RefObject<HTMLDivElement>;
    }

    export const MessageList: ComponentType<MessageListProps>;

    // InputBox component
    export interface InputBoxProps {
        onSendMessage: () => void;
        isSending: boolean;
    }

    export const InputBox: ComponentType<InputBoxProps>;

    // MessageItem component
    export interface MessageItemProps {
        text: string;
        isUser: boolean;
    }

    export const MessageItem: ComponentType<MessageItemProps>;

    // TypingIndicator component
    export interface TypingIndicatorProps {
        isTyping: boolean;
        animationData: any;
    }

    export const TypingIndicator: ComponentType<TypingIndicatorProps>;


    // PredefinedOptions component
    export interface PredefinedOptionsProps {
        onSendMessage: (text: string) => void;
        predefinedMessages: Array<string>;
    }

    export const PredefinedOptions: ComponentType<PredefinedOptionsProps>;

    // SendingAnimation component
    export interface SendingAnimationProps {
        animationData: any;
        isSending: boolean;
    }

    export const SendingAnimation: ComponentType<SendingAnimationProps>;

    // ChatIcon component
    export interface ChatIconProps {
        predefinedMessages: Array<string>;
        businessId: string;
    }

    export const ChatIcon: ComponentType<ChatIconProps>;

    // ChatBox component
    export interface ChatBoxProps {
        predefinedMessages?: Array<string>;
        isVisible?: boolean;
        onClose?: () => void;
        showPredefinedOptions?: boolean;
        onHidePredefined?: () => void;
        setMessages?: (messages: Array<{ text: string; isUser: boolean }>) => void;
        messages?: Array<{ text: string; isUser: boolean }>;
        businessId?: string;
    }

    export const ChatBox: ComponentType<ChatBoxProps>;
}
