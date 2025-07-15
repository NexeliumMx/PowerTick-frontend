// src/data/mockChartsData.js

const accumulatedConsumptionData = {
  magnitude: 70000,
  unit: 'kWh',
  magnitudeVAR: 70000,
  unitVAR: 'kVARh'
};

const consumptionHistoryData = [
  { name: 'Jan', kWh: 50 },
  { name: 'Feb', kWh: 60 },
  { name: 'Mar', kWh: 55 },
  { name: 'Apr', kWh: 40 },
  { name: 'May', kWh: 45 },
  { name: 'Jun', kWh: 47 },
  { name: 'Jul', kWh: 43 },
  { name: 'Aug', kWh: 52 },
  { name: 'Sept', kWh: 61 },
  { name: 'Oct', kWh: 64 },
  { name: 'Nov', kWh: 58 },
  { name: 'Dec', kWh: 67 },
];

const realtimeCurrentData = [
  { name: 'Total', current: 18.0 },
  { name: 'Phase A', current: 17.7 },
  { name: 'Phase B', current: 18.2 },
  { name: 'Phase C', current: 18.0 },
  { name: 'Phase Shift', current: 0.5 }
];

const demandProfileData = [
  { name: 'Jan', kW: 240 },
  { name: 'Feb', kW: 720 },
  { name: 'Mar', kW: 480 },
  { name: 'Apr', kW: 360 },
  { name: 'May', kW: 300 },
  { name: 'Jun', kW: 450 },
  { name: 'Jul', kW: 260 },
  { name: 'Aug', kW: 750 },
  { name: 'Sept', kW: 320 },
  { name: 'Oct', kW: 600 },
  { name: 'Nov', kW: 400 },
  { name: 'Dec', kW: 550 },
];

const historicConsumption = [
  { name: '-60 min', kWh: 6, kVARh: 1 },
  { name: '-55 min', kWh: 7, kVARh: 2 },
  { name: '-50 min', kWh: 6.5, kVARh: 2.5 },
  { name: '-45 min', kWh: 6, kVARh: 2 },
  { name: '-40 min', kWh: 5.5, kVARh: 2.2 },
  { name: '-35 min', kWh: 6.5, kVARh: 1.8 },
  { name: '-30 min', kWh: 6, kVARh: 1 },
  { name: '-25 min', kWh: 5, kVARh: 3 },
  { name: '-20 min', kWh: 6.5, kVARh: 3 },
  { name: '-15 min', kWh: 6.8, kVARh: 2 },
  { name: '-10 min', kWh: 5.5, kVARh: 2.5 },
  { name: '-5 min', kWh: 6, kVARh: 2.3 },
  { name: '0 min', kWh: 7, kVARh: 3 },
];

const historicPFData = [
  { name: '-60 min', pf: 0.91 },
  { name: '-55 min', pf: 0.92 },
  { name: '-50 min', pf: 0.94 },
  { name: '-45 min', pf: 0.96 },
  { name: '-40 min', pf: 0.93 },
  { name: '-35 min', pf: 0.92 },
  { name: '-30 min', pf: 0.91 },
  { name: '-25 min', pf: 0.93 },
  { name: '-20 min', pf: 0.95 },
  { name: '-15 min', pf: 0.97 },
  { name: '-10 min', pf: 0.99 },
  { name: '-5 min', pf: 0.98 },
  { name: '0 min', pf: 1.00 },
];

const maxDemandData = {
  magnitude: 70000,
  unit: 'kW',
  magnitudeVAR: 70000,
  unitVAR: 'kVAR'
};

const realtimePowerFactorData = [
  { name: 'Power Factor', value: 0.95 }, // Replace with actual value if needed
  { name: 'Remaining', value: 0.05 }
];

const historicReactivePowerDemand = [
  { name: '-60 min', kW: 5 },
  { name: '-55 min', kW: 5.5 },
  { name: '-50 min', kW: 5.7 },
  { name: '-45 min', kW: 5.3 },
  { name: '-40 min', kW: 4.9 },
  { name: '-35 min', kW: 5.1 },
  { name: '-30 min', kW: 5.6 },
  { name: '-25 min', kW: 5.9 },
  { name: '-20 min', kW: 6 },
  { name: '-15 min', kW: 5.7 },
  { name: '-10 min', kW: 5.4 },
  { name: '-5 min', kW: 5.9 },
  { name: '0 min', kW: 6.2 },
];

const historicRealPowerDemand = [
  { name: '-60 min', kW: 5 },
  { name: '-55 min', kW: 5.5 },
  { name: '-50 min', kW: 5.7 },
  { name: '-45 min', kW: 5.3 },
  { name: '-40 min', kW: 4.9 },
  { name: '-35 min', kW: 5.1 },
  { name: '-30 min', kW: 5.6 },
  { name: '-25 min', kW: 5.9 },
  { name: '-20 min', kW: 6 },
  { name: '-15 min', kW: 5.7 },
  { name: '-10 min', kW: 5.4 },
  { name: '-5 min', kW: 5.9 },
  { name: '0 min', kW: 6.2 },
];

const timestampData = "03 de Agosto de 2024 17:23";

export {
  accumulatedConsumptionData,
  consumptionHistoryData,
  realtimeCurrentData,
  demandProfileData,
  historicConsumption,
  historicPFData,
  maxDemandData,
  realtimePowerFactorData,
  historicReactivePowerDemand,
  historicRealPowerDemand,
  timestampData
};