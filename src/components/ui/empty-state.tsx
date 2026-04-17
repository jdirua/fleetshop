
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
  };
  features?: {
    title: string;
    items: {
      icon: React.ReactNode;
      text: string;
    }[];
  };
}

export function EmptyState({ title, description, icon, action, features }: EmptyStateProps) {
  return (
    <Card className="min-h-[70vh] flex items-center justify-center p-6 bg-transparent border-0 shadow-none">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
          {icon}
        </div>

        <h3 className="mt-8 text-3xl font-bold">{title}</h3>
        <p className="mt-4 text-lg text-slate-200">
          {description}
        </p>

        {action && (
          <Button onClick={action.onClick} className="mt-8 py-6 px-8 text-lg card-lift bg-purple-500 hover:bg-purple-600 text-white">
            <PlusCircle className="mr-3 h-5 w-5" />
            {action.text}
          </Button>
        )}

        {features && (
          <div className="mt-12 w-full max-w-3xl">
            <p className="text-sm uppercase text-slate-400 font-semibold tracking-wider">
              {features.title}
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {features.items.map((item, i) => (
                <div key={i} className="p-4 flex items-center space-x-3 bg-slate-800/5 backdrop-blur-lg border border-slate-300/20 rounded-lg">
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
