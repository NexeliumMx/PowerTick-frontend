const chartColors = {
  //Analysis
  //f9a824 naranja
  //1f89e5 azul
  // 88A61B verde opaco
  //44a248 verde
  // 0E3D59 azul opaco
  //4d8bff azul claro opaco
  // F29F05 amarillo
  // F25C05 naranja opaco
  // d92525 rojo
  realEnergy: "#F29F05",
  reactiveEnergy: "#F25C05",
  avgRealPower: "#cca42e",
  avgVar: "#F25C05",
  maxRealPower: "#F29F05",
  maxVar: "#c03900",


// THD Current Profile colors -
  phaseAAvg: "#cca42e", 
  phaseAMax: "#E6C85C",  
  phaseBAvg: "#F25C05",
  phaseBMax: "#FF8C42",   
  phaseCAvg: "#A0522D",  
  phaseCMax: "#8B5C2D",   
  phaseA: "#F29F05",    // Yellow for Phase 1 (L1)
  phaseB: "#F25C05",    // Orange for Phase 2 (L2)
  phaseC: "#A0522D",    // Brown for Phase 3 (L3)

  //Measurements
  phase1: "#eaeb81",
  phase2: "#f9e548",
  phase3: "#cca42e",
  phaseTotal: "#F29F05",

  //Measurements showcase
  front: "#eaeb81",
  back: "#d5d777",
  middle: "#dddf7b",

  //Powerfactor colors
  powerFactorGood: "#88A61B",
  powerFactorModerate: "#F29F05",
  powerFactorRisky:"#F25C05",
  powerFactorPoor: "#d92525",

// Demand LoadCenters
  nopeak: "#88A61B", // Green
  semipeak: "#F29F05", // Yellow
  peak: "#d92525", // Red
  undefined: "#9E9E9E", // Grey for undefined values
};

export default chartColors;