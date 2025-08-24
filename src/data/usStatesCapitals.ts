export interface StateCapital {
  state: string;
  capital: string;
  abbreviation: string;
  region: string;
}

export const usStatesCapitals: StateCapital[] = [
  { state: "Alabama", capital: "Montgomery", abbreviation: "AL", region: "South" },
  { state: "Alaska", capital: "Juneau", abbreviation: "AK", region: "West" },
  { state: "Arizona", capital: "Phoenix", abbreviation: "AZ", region: "West" },
  { state: "Arkansas", capital: "Little Rock", abbreviation: "AR", region: "South" },
  { state: "California", capital: "Sacramento", abbreviation: "CA", region: "West" },
  { state: "Colorado", capital: "Denver", abbreviation: "CO", region: "West" },
  { state: "Connecticut", capital: "Hartford", abbreviation: "CT", region: "Northeast" },
  { state: "Delaware", capital: "Dover", abbreviation: "DE", region: "Northeast" },
  { state: "Florida", capital: "Tallahassee", abbreviation: "FL", region: "South" },
  { state: "Georgia", capital: "Atlanta", abbreviation: "GA", region: "South" },
  { state: "Hawaii", capital: "Honolulu", abbreviation: "HI", region: "West" },
  { state: "Idaho", capital: "Boise", abbreviation: "ID", region: "West" },
  { state: "Illinois", capital: "Springfield", abbreviation: "IL", region: "Midwest" },
  { state: "Indiana", capital: "Indianapolis", abbreviation: "IN", region: "Midwest" },
  { state: "Iowa", capital: "Des Moines", abbreviation: "IA", region: "Midwest" },
  { state: "Kansas", capital: "Topeka", abbreviation: "KS", region: "Midwest" },
  { state: "Kentucky", capital: "Frankfort", abbreviation: "KY", region: "South" },
  { state: "Louisiana", capital: "Baton Rouge", abbreviation: "LA", region: "South" },
  { state: "Maine", capital: "Augusta", abbreviation: "ME", region: "Northeast" },
  { state: "Maryland", capital: "Annapolis", abbreviation: "MD", region: "Northeast" },
  { state: "Massachusetts", capital: "Boston", abbreviation: "MA", region: "Northeast" },
  { state: "Michigan", capital: "Lansing", abbreviation: "MI", region: "Midwest" },
  { state: "Minnesota", capital: "Saint Paul", abbreviation: "MN", region: "Midwest" },
  { state: "Mississippi", capital: "Jackson", abbreviation: "MS", region: "South" },
  { state: "Missouri", capital: "Jefferson City", abbreviation: "MO", region: "Midwest" },
  { state: "Montana", capital: "Helena", abbreviation: "MT", region: "West" },
  { state: "Nebraska", capital: "Lincoln", abbreviation: "NE", region: "Midwest" },
  { state: "Nevada", capital: "Carson City", abbreviation: "NV", region: "West" },
  { state: "New Hampshire", capital: "Concord", abbreviation: "NH", region: "Northeast" },
  { state: "New Jersey", capital: "Trenton", abbreviation: "NJ", region: "Northeast" },
  { state: "New Mexico", capital: "Santa Fe", abbreviation: "NM", region: "West" },
  { state: "New York", capital: "Albany", abbreviation: "NY", region: "Northeast" },
  { state: "North Carolina", capital: "Raleigh", abbreviation: "NC", region: "South" },
  { state: "North Dakota", capital: "Bismarck", abbreviation: "ND", region: "Midwest" },
  { state: "Ohio", capital: "Columbus", abbreviation: "OH", region: "Midwest" },
  { state: "Oklahoma", capital: "Oklahoma City", abbreviation: "OK", region: "South" },
  { state: "Oregon", capital: "Salem", abbreviation: "OR", region: "West" },
  { state: "Pennsylvania", capital: "Harrisburg", abbreviation: "PA", region: "Northeast" },
  { state: "Rhode Island", capital: "Providence", abbreviation: "RI", region: "Northeast" },
  { state: "South Carolina", capital: "Columbia", abbreviation: "SC", region: "South" },
  { state: "South Dakota", capital: "Pierre", abbreviation: "SD", region: "Midwest" },
  { state: "Tennessee", capital: "Nashville", abbreviation: "TN", region: "South" },
  { state: "Texas", capital: "Austin", abbreviation: "TX", region: "South" },
  { state: "Utah", capital: "Salt Lake City", abbreviation: "UT", region: "West" },
  { state: "Vermont", capital: "Montpelier", abbreviation: "VT", region: "Northeast" },
  { state: "Virginia", capital: "Richmond", abbreviation: "VA", region: "South" },
  { state: "Washington", capital: "Olympia", abbreviation: "WA", region: "West" },
  { state: "West Virginia", capital: "Charleston", abbreviation: "WV", region: "South" },
  { state: "Wisconsin", capital: "Madison", abbreviation: "WI", region: "Midwest" },
  { state: "Wyoming", capital: "Cheyenne", abbreviation: "WY", region: "West" }
];

export const regions = ["Northeast", "South", "Midwest", "West"] as const;
export type Region = typeof regions[number];