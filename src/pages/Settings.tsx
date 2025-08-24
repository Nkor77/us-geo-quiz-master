import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play } from "lucide-react";
import { usStatesCapitals, regions, Region } from "@/data/usStatesCapitals";

export default function Settings() {
  const navigate = useNavigate();
  const [selectedStates, setSelectedStates] = useState<string[]>(
    usStatesCapitals.map(item => item.abbreviation)
  );
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([...regions]);
  
  const handleStateToggle = (abbreviation: string) => {
    setSelectedStates(prev => 
      prev.includes(abbreviation)
        ? prev.filter(s => s !== abbreviation)
        : [...prev, abbreviation]
    );
  };
  
  const handleRegionToggle = (region: Region) => {
    const regionStates = usStatesCapitals
      .filter(item => item.region === region)
      .map(item => item.abbreviation);
    
    const allRegionSelected = regionStates.every(state => selectedStates.includes(state));
    
    if (allRegionSelected) {
      // Deselect all states in this region
      setSelectedStates(prev => prev.filter(state => !regionStates.includes(state)));
      setSelectedRegions(prev => prev.filter(r => r !== region));
    } else {
      // Select all states in this region
      setSelectedStates(prev => [...new Set([...prev, ...regionStates])]);
      setSelectedRegions(prev => [...new Set([...prev, region])]);
    }
  };
  
  const selectAll = () => {
    setSelectedStates(usStatesCapitals.map(item => item.abbreviation));
    setSelectedRegions([...regions]);
  };
  
  const deselectAll = () => {
    setSelectedStates([]);
    setSelectedRegions([]);
  };
  
  const startQuiz = (type: "states" | "capitals", mode: "map" | "multiple-choice") => {
    if (selectedStates.length === 0) {
      return;
    }
    navigate(`/quiz?type=${type}&mode=${mode}&selected=${selectedStates.join(",")}`);
  };
  
  const getRegionColor = (region: Region) => {
    const colors = {
      Northeast: "bg-blue-100 text-blue-800 border-blue-200",
      South: "bg-green-100 text-green-800 border-green-200", 
      Midwest: "bg-orange-100 text-orange-800 border-orange-200",
      West: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[region];
  };
  
  return (
    <div className="min-h-screen bg-quiz-hero p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate("/")} 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Quiz Settings</h1>
            <p className="text-white/80">Select states and regions to study</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={selectAll}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Select All
            </Button>
            <Button 
              onClick={deselectAll}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Clear All
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <Card className="p-4 mb-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-center text-white">
            <span className="text-2xl font-bold">{selectedStates.length}</span>
            <span className="text-white/80 ml-2">of {usStatesCapitals.length} states selected</span>
          </div>
        </Card>
        
        {/* Region Selection */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm shadow-quiz">
          <h3 className="text-xl font-bold mb-4 text-primary">Select by Region</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map(region => {
              const regionStates = usStatesCapitals.filter(item => item.region === region);
              const isSelected = selectedRegions.includes(region);
              
              return (
                <div
                  key={region}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `${getRegionColor(region)} border-current` 
                      : "bg-muted border-muted hover:bg-muted/80"
                  }`}
                  onClick={() => handleRegionToggle(region)}
                >
                  <div className="text-center">
                    <h4 className="font-semibold mb-1">{region}</h4>
                    <p className="text-sm opacity-80">{regionStates.length} states</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* Individual State Selection */}
        <Card className="p-6 mb-6 bg-white/95 backdrop-blur-sm shadow-quiz">
          <h3 className="text-xl font-bold mb-4 text-primary">Individual States</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {usStatesCapitals.map(item => (
              <div
                key={item.abbreviation}
                className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={item.abbreviation}
                  checked={selectedStates.includes(item.abbreviation)}
                  onCheckedChange={() => handleStateToggle(item.abbreviation)}
                />
                <label
                  htmlFor={item.abbreviation}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  <div>
                    <Badge 
                      variant="outline" 
                      className={`mb-1 ${getRegionColor(item.region as Region)}`}
                    >
                      {item.abbreviation}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {item.state}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Start Quiz Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white/95 shadow-quiz">
            <h3 className="text-xl font-bold mb-4 text-primary">US States Quiz</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge of US state names
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => startQuiz("states", "multiple-choice")} 
                className="w-full"
                disabled={selectedStates.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Multiple Choice
              </Button>
              <Button 
                onClick={() => startQuiz("states", "map")} 
                variant="outline"
                className="w-full"
                disabled={selectedStates.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Map Mode
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/95 shadow-quiz">
            <h3 className="text-xl font-bold mb-4 text-secondary">US Capitals Quiz</h3>
            <p className="text-muted-foreground mb-4">
              Test your knowledge of state capitals
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => startQuiz("capitals", "multiple-choice")} 
                variant="secondary"
                className="w-full"
                disabled={selectedStates.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Multiple Choice
              </Button>
              <Button 
                onClick={() => startQuiz("capitals", "map")} 
                variant="outline"
                className="w-full"
                disabled={selectedStates.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Map Mode
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}