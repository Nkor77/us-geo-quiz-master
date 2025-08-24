import { Home, Map, Brain, Settings } from "lucide-react";
import { QuizCard } from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-quiz-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                <Home className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              US Geography Quiz
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Master US states and capitals with interactive quizzes! Choose your study focus, 
              track your progress, and learn through engaging map-based and multiple choice games.
            </p>
          </div>

          {/* Quick Start Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              onClick={() => navigate("/quiz?type=states&mode=multiple-choice")}
              className="px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Brain className="h-5 w-5 mr-2" />
              Quick Start: States Quiz
            </Button>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate("/quiz?type=capitals&mode=multiple-choice")}
              className="px-8 py-4 text-lg font-semibold bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Map className="h-5 w-5 mr-2" />
              Quick Start: Capitals Quiz
            </Button>
          </div>

          {/* Quiz Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <QuizCard
              title="US States Quiz"
              description="Test your knowledge of all 50 US states. Learn through interactive multiple choice questions and map-based challenges."
              icon="brain"
              variant="primary"
              onClick={() => navigate("/quiz?type=states&mode=multiple-choice")}
            />
            
            <QuizCard
              title="US Capitals Quiz"
              description="Master state capitals with engaging quizzes. Perfect for students and geography enthusiasts."
              icon="map"
              variant="secondary"
              onClick={() => navigate("/quiz?type=capitals&mode=multiple-choice")}
            />
            
            <QuizCard
              title="Custom Study"
              description="Choose specific states and regions to focus on. Customize your learning experience."
              icon="settings"
              variant="accent"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Why Choose Our Quiz Platform?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for effective learning with modern, engaging features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-quiz transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">Engaging quizzes with immediate feedback</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-success transition-shadow duration-300">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Map className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Map Integration</h3>
              <p className="text-sm text-muted-foreground">Visual learning with interactive US maps</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-quiz transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Custom Study</h3>
              <p className="text-sm text-muted-foreground">Focus on specific regions or states</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-error transition-shadow duration-300">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor your learning journey</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
