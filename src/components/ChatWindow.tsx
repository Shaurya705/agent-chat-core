import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  agentName: string;
  agentAvatar?: string;
  isTyping?: boolean;
}

export const ChatWindow = ({ messages, agentName, agentAvatar, isTyping }: ChatWindowProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target) {
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
      setAutoScroll(isNearBottom);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, isTyping, autoScroll]);

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="flex-1 relative">
      <ScrollArea ref={scrollAreaRef} className="h-full">
        <div className="space-y-1">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {agentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to {agentName}!</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                I'm here to help you with any questions or tasks you might have. 
                Feel free to start a conversation or use one of the quick actions above.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  sender={message.sender}
                  timestamp={message.timestamp}
                  agentName={agentName}
                  agentAvatar={agentAvatar}
                />
              ))}
              
              {isTyping && (
                <ChatMessage
                  id="typing"
                  content=""
                  sender="agent"
                  timestamp={new Date()}
                  agentName={agentName}
                  agentAvatar={agentAvatar}
                  isTyping={true}
                />
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {showScrollButton && (
        <Button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 h-10 w-10 p-0 rounded-full shadow-lg bg-accent hover:bg-accent-hover text-accent-foreground"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};