// Import state images
import californiaImg from "@/assets/states/california.jpg";
import texasImg from "@/assets/states/texas.jpg";
import newYorkImg from "@/assets/states/new-york.jpg";
import floridaImg from "@/assets/states/florida.jpg";
import alaskaImg from "@/assets/states/alaska.jpg";
import hawaiiImg from "@/assets/states/hawaii.jpg";
import coloradoImg from "@/assets/states/colorado.jpg";

// Map of state names to their images
export const stateImages: Record<string, string> = {
  "California": californiaImg,
  "Texas": texasImg,
  "New York": newYorkImg,
  "Florida": floridaImg,
  "Alaska": alaskaImg,
  "Hawaii": hawaiiImg,
  "Colorado": coloradoImg,
};

// Function to get image for a state (returns placeholder if not available)
export const getStateImage = (stateName: string): string => {
  return stateImages[stateName] || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center`;
};

// Function to get image for a capital (using state image as proxy)
export const getCapitalImage = (stateName: string): string => {
  // For capitals, we'll use the same state images but could be enhanced with capital-specific images
  return getStateImage(stateName);
};