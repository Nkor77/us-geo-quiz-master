import { useState, useRef } from "react";
import { usStatesCapitals, StateCapital } from "@/data/usStatesCapitals";

interface InteractiveMapProps {
  currentQuestion: StateCapital;
  onStateClick: (stateName: string) => void;
  quizType: "states" | "capitals";
  hasAnswered: boolean;
}

// Approximate coordinates for US states on the map (as percentages)
const stateCoordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
  "Alabama": { x: 71, y: 65, width: 8, height: 12 },
  "Alaska": { x: 8, y: 78, width: 15, height: 18 },
  "Arizona": { x: 25, y: 58, width: 10, height: 12 },
  "Arkansas": { x: 60, y: 58, width: 8, height: 10 },
  "California": { x: 8, y: 38, width: 12, height: 20 },
  "Colorado": { x: 40, y: 48, width: 10, height: 10 },
  "Connecticut": { x: 87, y: 38, width: 4, height: 4 },
  "Delaware": { x: 85, y: 48, width: 3, height: 6 },
  "Florida": { x: 78, y: 78, width: 12, height: 15 },
  "Georgia": { x: 75, y: 62, width: 8, height: 12 },
  "Hawaii": { x: 18, y: 85, width: 8, height: 8 },
  "Idaho": { x: 28, y: 28, width: 8, height: 15 },
  "Illinois": { x: 62, y: 42, width: 6, height: 12 },
  "Indiana": { x: 68, y: 42, width: 6, height: 10 },
  "Iowa": { x: 55, y: 42, width: 8, height: 8 },
  "Kansas": { x: 48, y: 52, width: 10, height: 8 },
  "Kentucky": { x: 70, y: 52, width: 10, height: 6 },
  "Louisiana": { x: 58, y: 72, width: 10, height: 10 },
  "Maine": { x: 88, y: 25, width: 8, height: 15 },
  "Maryland": { x: 82, y: 48, width: 6, height: 4 },
  "Massachusetts": { x: 85, y: 35, width: 8, height: 4 },
  "Michigan": { x: 65, y: 32, width: 12, height: 15 },
  "Minnesota": { x: 52, y: 28, width: 8, height: 12 },
  "Mississippi": { x: 63, y: 65, width: 6, height: 12 },
  "Missouri": { x: 55, y: 50, width: 10, height: 10 },
  "Montana": { x: 35, y: 25, width: 15, height: 10 },
  "Nebraska": { x: 45, y: 45, width: 10, height: 8 },
  "Nevada": { x: 20, y: 42, width: 8, height: 12 },
  "New Hampshire": { x: 85, y: 28, width: 5, height: 8 },
  "New Jersey": { x: 83, y: 42, width: 4, height: 8 },
  "New Mexico": { x: 35, y: 58, width: 10, height: 12 },
  "New York": { x: 78, y: 32, width: 10, height: 12 },
  "North Carolina": { x: 78, y: 55, width: 12, height: 8 },
  "North Dakota": { x: 45, y: 25, width: 10, height: 8 },
  "Ohio": { x: 72, y: 45, width: 8, height: 10 },
  "Oklahoma": { x: 50, y: 58, width: 12, height: 8 },
  "Oregon": { x: 15, y: 32, width: 10, height: 8 },
  "Pennsylvania": { x: 78, y: 42, width: 10, height: 8 },
  "Rhode Island": { x: 88, y: 38, width: 2, height: 3 },
  "South Carolina": { x: 78, y: 62, width: 8, height: 8 },
  "South Dakota": { x: 45, y: 35, width: 10, height: 8 },
  "Tennessee": { x: 70, y: 55, width: 12, height: 6 },
  "Texas": { x: 42, y: 65, width: 18, height: 18 },
  "Utah": { x: 30, y: 45, width: 8, height: 12 },
  "Vermont": { x: 83, y: 25, width: 4, height: 10 },
  "Virginia": { x: 78, y: 50, width: 10, height: 6 },
  "Washington": { x: 18, y: 18, width: 12, height: 8 },
  "West Virginia": { x: 75, y: 48, width: 6, height: 8 },
  "Wisconsin": { x: 58, y: 32, width: 8, height: 12 },
  "Wyoming": { x: 35, y: 35, width: 10, height: 10 }
};

export function InteractiveMap({ currentQuestion, onStateClick, quizType, hasAnswered }: InteractiveMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hasAnswered) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Find which state was clicked based on coordinates
    for (const [stateName, coords] of Object.entries(stateCoordinates)) {
      if (
        x >= coords.x && 
        x <= coords.x + coords.width && 
        y >= coords.y && 
        y <= coords.y + coords.height
      ) {
        onStateClick(stateName);
        return;
      }
    }
  };

  const getStateStyle = (stateName: string) => {
    const coords = stateCoordinates[stateName];
    if (!coords) return {};
    
    const correctAnswer = quizType === "states" ? currentQuestion.state : currentQuestion.capital;
    const isCorrectState = stateName === currentQuestion.state;
    const isHovered = hoveredState === stateName;
    
    return {
      position: 'absolute' as const,
      left: `${coords.x}%`,
      top: `${coords.y}%`,
      width: `${coords.width}%`,
      height: `${coords.height}%`,
      cursor: hasAnswered ? 'default' : 'pointer',
      backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
      border: isHovered ? '2px solid #3b82f6' : 'none',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      zIndex: isHovered ? 10 : 1,
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div 
        ref={mapRef}
        className="relative w-full aspect-[4/3] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={handleMapClick}
        style={{
          backgroundImage: `url(/lovable-uploads/94b4abaf-4b0e-422c-93a8-74e659e0a51f.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Clickable regions for each state */}
        {Object.keys(stateCoordinates).map(stateName => (
          <div
            key={stateName}
            style={getStateStyle(stateName)}
            onMouseEnter={() => setHoveredState(stateName)}
            onMouseLeave={() => setHoveredState(null)}
            title={stateName}
          />
        ))}
        
        {/* Hover tooltip */}
        {hoveredState && (
          <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded-md text-sm font-medium pointer-events-none z-20">
            {hoveredState}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-muted-foreground">
          Click on {quizType === "states" ? "the state" : "the state whose capital is"}{" "}
          <span className="font-semibold text-primary">
            {quizType === "states" ? currentQuestion.capital : currentQuestion.state}
          </span>
        </p>
      </div>
    </div>
  );
}