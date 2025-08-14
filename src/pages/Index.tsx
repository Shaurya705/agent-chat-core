import { useState, useCallback } from "react";
import { AgentHeader } from "@/components/AgentHeader";
import { QuickActions } from "@/components/QuickActions";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatInput } from "@/components/ChatInput";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/platform-hero.jpg";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Simulate agent responses
  const getAgentResponse = (userMessage: string): string => {
    const responses = [
      "I understand you're looking for assistance. How can I help you today?",
      "That's a great question! Let me provide you with the information you need.",
      "I'm here to help you achieve your goals. What specific area would you like to focus on?",
      "Based on your message, I can suggest several options that might be useful for you.",
      "I'll be happy to guide you through this process step by step."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        content: getAgentResponse(content),
        sender: "agent",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, []);

  const handleQuickAction = useCallback((actionId: string) => {
    const actionMessages: Record<string, string> = {
      "get-started": "Hi! I'd like to get started. Can you help me understand how this platform works?",
      "documentation": "Can you show me the documentation or help resources?",
      "schedule": "I'd like to schedule a meeting or consultation. What are the available options?",
      "support": "I need support with a specific issue. Can you assist me?"
    };

    const message = actionMessages[actionId] || `Selected action: ${actionId}`;
    handleSendMessage(message);
    
    toast({
      title: "Quick Action Selected",
      description: `Started conversation with: ${actionId}`,
    });
  }, [handleSendMessage, toast]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <div className="min-h-screen bg-background/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto h-screen flex flex-col">
          <AgentHeader
            agentName="AI Assistant Pro"
            status="online"
            description="Your intelligent business automation partner"
          />
          
          <QuickActions onActionClick={handleQuickAction} />
          
          <ChatWindow
            messages={messages}
            agentName="AI Assistant Pro"
            isTyping={isTyping}
          />
          
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            placeholder="Ask me anything about our platform..."
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
