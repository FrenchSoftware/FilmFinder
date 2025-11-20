import { RefObject } from 'react';
import { ChatMessage } from './chat-message';
import { LoadingIndicator } from './loading-indicator';
import type { MessagePart } from '@/types/movie';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: MessagePart[];
}

interface MessagesListProps {
  messages: Message[];
  isStreaming: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function MessagesList({ messages, isStreaming, messagesEndRef }: MessagesListProps) {
  return (
    <div className="space-y-6">
      {messages
        .filter((message) => message.role !== 'system')
        .map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role as 'user' | 'assistant'}
            parts={message.parts}
          />
        ))}
      {isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
        <LoadingIndicator />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
