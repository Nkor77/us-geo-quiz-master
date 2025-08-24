import { useState, useRef } from "react";
import { usStatesCapitals, StateCapital } from "@/data/usStatesCapitals";

interface InteractiveMapProps {
  currentQuestion: StateCapital;
  onStateClick: (stateName: string) => void;
  quizType: "states" | "capitals";
  hasAnswered: boolean;
}

// More precise coordinates for US states on the map (smaller, more accurate clickable areas)
const stateCoordinates: Record<string, { x: number; y: number; width: number; height: number }> = {
  "Alabama": { x: 72, y: 67, width: 4, height: 8 },
  "Alaska": { x: 10, y: 80, width: 8, height: 10 },
  "Arizona": { x: 26, y: 60, width: 6, height: 8 },
  "Arkansas": { x: 61, y: 59, width: 5, height: 6 },
  "California": { x: 10, y: 42, width: 6, height: 15 },
  "Colorado": { x: 41, y: 50, width: 6, height: 6 },
  "Connecticut": { x: 88, y: 39, width: 2, height: 2 },
  "Delaware": { x: 85, y: 49, width: 1.5, height: 3 },
  "Florida": { x: 80, y: 80, width: 6, height: 8 },
  "Georgia": { x: 76, y: 64, width: 4, height: 8 },
  "Hawaii": { x: 20, y: 87, width: 4, height: 4 },
  "Idaho": { x: 29, y: 30, width: 4, height: 10 },
  "Illinois": { x: 63, y: 44, width: 3, height: 8 },
  "Indiana": { x: 69, y: 44, width: 3, height: 6 },
  "Iowa": { x: 56, y: 44, width: 4, height: 5 },
  "Kansas": { x: 49, y: 54, width: 6, height: 4 },
  "Kentucky": { x: 71, y: 53, width: 6, height: 3 },
  "Louisiana": { x: 59, y: 74, width: 5, height: 6 },
  "Maine": { x: 89, y: 27, width: 4, height: 10 },
  "Maryland": { x: 83, y: 49, width: 3, height: 2 },
  "Massachusetts": { x: 86, y: 36, width: 4, height: 2 },
  "Michigan": { x: 66, y: 34, width: 6, height: 10 },
  "Minnesota": { x: 53, y: 30, width: 4, height: 8 },
  "Mississippi": { x: 64, y: 67, width: 3, height: 8 },
  "Missouri": { x: 56, y: 52, width: 5, height: 6 },
  "Montana": { x: 36, y: 27, width: 8, height: 6 },
  "Nebraska": { x: 46, y: 47, width: 6, height: 4 },
  "Nevada": { x: 21, y: 45, width: 4, height: 8 },
  "New Hampshire": { x: 86, y: 30, width: 2.5, height: 5 },
  "New Jersey": { x: 84, y: 44, width: 2, height: 4 },
  "New Mexico": { x: 36, y: 60, width: 6, height: 8 },
  "New York": { x: 79, y: 34, width: 5, height: 8 },
  "North Carolina": { x: 79, y: 56, width: 8, height: 4 },
  "North Dakota": { x: 46, y: 27, width: 6, height: 4 },
  "Ohio": { x: 73, y: 47, width: 4, height: 6 },
  "Oklahoma": { x: 51, y: 60, width: 8, height: 4 },
  "Oregon": { x: 16, y: 34, width: 6, height: 4 },
  "Pennsylvania": { x: 79, y: 44, width: 6, height: 4 },
  "Rhode Island": { x: 88, y: 39, width: 1, height: 1.5 },
  "South Carolina": { x: 79, y: 63, width: 4, height: 4 },
  "South Dakota": { x: 46, y: 37, width: 6, height: 4 },
  "Tennessee": { x: 71, y: 56, width: 8, height: 3 },
  "Texas": { x: 44, y: 67, width: 12, height: 12 },
  "Utah": { x: 31, y: 47, width: 4, height: 8 },
  "Vermont": { x: 84, y: 27, width: 2, height: 6 },
  "Virginia": { x: 79, y: 51, width: 6, height: 3 },
  "Washington": { x: 19, y: 20, width: 8, height: 4 },
  "West Virginia": { x: 76, y: 49, width: 3, height: 5 },
  "Wisconsin": { x: 59, y: 34, width: 4, height: 8 },
  "Wyoming": { x: 36, y: 37, width: 6, height: 6 }
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
          Click on {" "}
          <span className="font-semibold text-primary">
            {quizType === "states" ? currentQuestion.state : `the state whose capital is ${currentQuestion.capital}`}
          </span>
        </p>
      </div>
    </div>
  );
}