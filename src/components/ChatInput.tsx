import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Type your message..." 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[44px] max-h-32 resize-none rounded-xl border-border/50 bg-background/50 backdrop-blur-sm focus:border-accent/50 focus:ring-accent/20 pr-12"
            rows={1}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleRecording}
            className={`h-11 w-11 p-0 border-border/50 ${
              isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : 'hover:bg-accent/10'
            }`}
          >
            <Mic className={`h-4 w-4 ${isRecording ? 'text-white' : 'text-muted-foreground'}`} />
          </Button>

          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="h-11 w-11 p-0 btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="mt-2 text-xs text-muted-foreground text-center">
        Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, 
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs ml-1">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};