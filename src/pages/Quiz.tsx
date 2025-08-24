import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { usStatesCapitals, StateCapital } from "@/data/usStatesCapitals";
import { useToast } from "@/hooks/use-toast";

type QuizType = "states" | "capitals";
type GameMode = "map" | "multiple-choice";

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const quizType = searchParams.get("type") as QuizType || "states";
  const gameMode = searchParams.get("mode") as GameMode || "multiple-choice";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedStates, setSelectedStates] = useState<StateCapital[]>(usStatesCapitals);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  const totalQuestions = selectedStates.length;
  const currentItem = selectedStates[currentQuestion];
  
  useEffect(() => {
    generateOptions();
  }, [currentQuestion, selectedStates]);
  
  const generateOptions = () => {
    if (!currentItem) return;
    
    const correctAnswer = quizType === "states" ? currentItem.state : currentItem.capital;
    const otherOptions = usStatesCapitals
      .filter(item => item !== currentItem)
      .map(item => quizType === "states" ? item.state : item.capital)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);
    setCurrentOptions(allOptions);
  };
  
  const handleAnswer = (answer: string) => {
    if (hasAnswered) return;
    
    setAttempts(prev => prev + 1);
    setHasAnswered(true);
    
    const correctAnswer = quizType === "states" ? currentItem.state : currentItem.capital;
    const isCorrect = answer === correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: `${currentItem.state} - ${currentItem.capital}`,
      });
      
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else {
      toast({
        title: "Incorrect - Try Again!",
        description: `The correct answer is ${correctAnswer}`,
        variant: "destructive",
      });
      
      setTimeout(() => {
        setHasAnswered(false);
      }, 2000);
    }
  };
  
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setHasAnswered(false);
    } else {
      // Quiz complete
      toast({
        title: "Quiz Complete! 🎊",
        description: `Final Score: ${score + 1}/${totalQuestions}`,
      });
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAttempts(0);
    setHasAnswered(false);
  };
  
  if (!currentItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No questions available</h2>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }
  
  const questionText = quizType === "states" 
    ? `What state has the capital ${currentItem.capital}?`
    : `What is the capital of ${currentItem.state}?`;
  
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="min-h-screen bg-quiz-hero p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate("/")} 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {quizType === "states" ? "US States" : "US Capitals"}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {gameMode === "map" ? "Map Mode" : "Multiple Choice"}
            </Badge>
          </div>
          
          <Button 
            onClick={resetQuiz}
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        {/* Progress */}
        <Card className="p-6 mb-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-white font-medium">
              Score: {score}/{totalQuestions} | Attempts: {attempts}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </Card>
        
        {/* Question */}
        <Card className="p-8 mb-6 bg-white/95 backdrop-blur-sm shadow-quiz">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            {questionText}
          </h2>
          
          {gameMode === "multiple-choice" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentOptions.map((option, index) => {
                const correctAnswer = quizType === "states" ? currentItem.state : currentItem.capital;
                const isCorrect = option === correctAnswer;
                const buttonVariant = hasAnswered 
                  ? (isCorrect ? "default" : "outline")
                  : "outline";
                const buttonClass = hasAnswered
                  ? (isCorrect 
                      ? "bg-success hover:bg-success text-success-foreground border-success" 
                      : "")
                  : "hover:bg-primary/10 hover:border-primary";
                  
                return (
                  <Button
                    key={option}
                    variant={buttonVariant}
                    size="lg"
                    className={`p-6 h-auto text-left justify-start transition-all duration-300 ${buttonClass}`}
                    onClick={() => handleAnswer(option)}
                    disabled={hasAnswered}
                  >
                    <span className="text-lg font-medium">{option}</span>
                  </Button>
                );
              })}
            </div>
          )}
          
          {gameMode === "map" && (
            <div className="text-center">
              <div className="bg-muted/50 rounded-lg p-8 mb-4">
                <p className="text-muted-foreground mb-4">Map mode coming soon!</p>
                <p className="text-sm text-muted-foreground">
                  Click on the map to select states and capitals
                </p>
              </div>
              <Button 
                onClick={() => navigate(`/quiz?type=${quizType}&mode=multiple-choice`)}
                variant="outline"
              >
                Switch to Multiple Choice
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}