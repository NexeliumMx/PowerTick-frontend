/*
 * FileName: apiEndpoints.js
 * Author(s): Arturo Vargas
 * Brief: API endpoints configuration for PowerTick application
 * Date: 2025-07-11
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

// API Base URL
const API_BASE_URL = 'https://power-tick-api-js.nexelium.mx';

// API Endpoints
const apiEndpoints = {
  // Consumption endpoints
  consumptionHistory: '/api/consumptionHistory',
  consumptionProfile: '/api/consumptionProfile',
  
  // Demand endpoints
  demandHistory: '/api/demandHistory',
  demandProfile: '/api/demandProfile',
  
  // Powermeter endpoints
  fetchPowermetersByUserAccess: '/api/fetchPowermetersByUserAccess',
  fetchRealTimeData: '/api/fetchRealTimeData',
  powermeter: '/api/powermeter',
  
  // Load centers endpoint
  loadCenters: '/api/loadCenters',
  
  // Measurement endpoints
  measurementRange: '/api/measurementRange',
  postMeasurement: '/api/postMeasurement',
  
  // Report endpoint
  monthlyReport: '/api/monthlyReport',
  
  // Support endpoints
  supportedModels: '/api/supportedModels',
  supportedTimeZones: '/api/supportedTimeZones',
  
  // Database test endpoint
  testDBconnection: '/api/testDBconnection',
  
  // Health check endpoints
  ping: '/api/ping',
  
  // THD Current endpoints
  thdCurrentHistory: '/api/thdCurrentHistory',
  thdCurrentProfile: '/api/thdCurrentProfile',
  
  // THD Voltage LL endpoints
  thdVoltageLLHistory: '/api/thdVoltageLLHistory',
  thdVoltageLLProfile: '/api/thdVoltageLLProfile',
  
  // THD Voltage LN endpoints
  thdVoltageLNHistory: '/api/thdVoltageLNHistory',
  thdVoltageLNProfile: '/api/thdVoltageLNProfile',

  //Download
  downloadCsv: '/api/downloads',
};

export { apiEndpoints, API_BASE_URL };