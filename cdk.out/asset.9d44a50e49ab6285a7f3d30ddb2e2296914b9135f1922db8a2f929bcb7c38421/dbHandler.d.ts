import { MessageType } from './conversationModel';
export declare function dbHandler(messageType: MessageType, message: string, userId: string): Promise<string[]>;
