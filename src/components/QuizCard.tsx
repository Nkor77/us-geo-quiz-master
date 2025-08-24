import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Brain, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  title: string;
  description: string;
  icon: "map" | "brain" | "settings";
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  onClick?: () => void;
}

const iconMap = {
  map: MapPin,
  brain: Brain,
  settings: Settings,
};

const variantStyles = {
  primary: "bg-quiz-primary border-primary/20 shadow-quiz hover:shadow-primary/20",
  secondary: "bg-quiz-success border-success/20 shadow-success hover:shadow-success/30",
  accent: "bg-quiz-accent border-accent/20 shadow-quiz hover:shadow-accent/20",
};

export function QuizCard({ 
  title, 
  description, 
  icon, 
  variant = "primary", 
  className,
  onClick 
}: QuizCardProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <Card 
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <IconComponent className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 transition-colors"
        >
          Start Quiz
        </Button>
      </div>
    </Card>
  );
}