import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
  isTyping?: boolean;
}

export const ChatMessage = ({ 
  content, 
  sender, 
  timestamp, 
  agentName = "AI Agent", 
  agentAvatar,
  isTyping = false 
}: ChatMessageProps) => {
  const isUser = sender === "user";

  return (
    <div className={`flex gap-3 p-4 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 border border-border/50">
          <AvatarImage src={agentAvatar} alt={agentName} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-medium">
            {agentName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {isUser ? "You" : agentName}
          </span>
          <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-chat-timestamp border-border/30">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </Badge>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-accent text-accent-foreground rounded-br-sm'
              : 'surface-card rounded-bl-sm border border-border/30'
          } ${isTyping ? 'typing-indicator' : ''}`}
        >
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-muted-foreground ml-2">Typing...</span>
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
            />
          )}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 border border-border/50">
          <AvatarFallback className="bg-gradient-to-br from-accent to-primary text-accent-foreground text-xs font-medium">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};