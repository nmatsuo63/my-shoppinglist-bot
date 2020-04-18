export declare enum MessageType {
    Confirm = 0,
    Clear = 1,
    Add = 2
}
interface ReplyModel {
    message: string;
    type: MessageType;
}
export declare const conversation: (message: string) => ReplyModel;
export {};
