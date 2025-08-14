import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Calendar, HelpCircle } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  onActionClick: (actionId: string) => void;
}

const defaultActions: QuickAction[] = [
  {
    id: "get-started",
    label: "Get Started",
    icon: <MessageSquare className="h-4 w-4" />,
    description: "Begin our conversation"
  },
  {
    id: "documentation",
    label: "Documentation",
    icon: <FileText className="h-4 w-4" />,
    description: "View help resources"
  },
  {
    id: "schedule",
    label: "Schedule Meeting",
    icon: <Calendar className="h-4 w-4" />,
    description: "Book a consultation"
  },
  {
    id: "support",
    label: "Get Support",
    icon: <HelpCircle className="h-4 w-4" />,
    description: "Contact assistance"
  }
];

export const QuickActions = ({ actions = defaultActions, onActionClick }: QuickActionsProps) => {
  return (
    <div className="p-4 border-b border-border/50">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action.id)}
            className="flex flex-col items-center gap-1 h-auto py-3 px-2 hover:bg-accent/10 hover:border-accent/50 transition-all duration-200 group"
          >
            <div className="text-accent group-hover:scale-110 transition-transform duration-200">
              {action.icon}
            </div>
            <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};