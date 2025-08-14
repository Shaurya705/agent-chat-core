import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, MoreVertical } from "lucide-react";

interface AgentHeaderProps {
  agentName: string;
  status: "online" | "busy" | "offline";
  description: string;
  avatar?: string;
}

export const AgentHeader = ({ agentName, status, description, avatar }: AgentHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "status-online";
      case "busy": return "status-busy";
      default: return "status-offline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "busy": return "Busy";
      default: return "Offline";
    }
  };

  return (
    <header className="surface-card p-4 border-b border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-accent/20">
              <AvatarImage src={avatar} alt={agentName} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                {agentName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(status)}`}
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-foreground">{agentName}</h1>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={`text-xs px-2 py-1 ${
                  status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  status === 'busy' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(status)}`} />
                {getStatusText(status)}
              </Badge>
              <span className="text-sm text-muted-foreground">{description}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};