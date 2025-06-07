/**
 * FileName: src/services/api/httpRequests.js
 * Author(s): Arturo Vargas
 * Brief: Provides the API request functions for the application.
 * Date: 2025-06-01
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

// Accepts an optional 'mode' argument: 'DEMO', 'DEV', or 'PRODUCTION'

// Fetch powermeters by user access
export async function fetchPowermetersByUserAccess(user_id, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/fetchPowermetersByUserAccess?user_id=${user_id}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchPowermetersByUserAccess: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch powermeters by user access');
  }

  return resData;
}

// Fetch measurement range for a powermeter
export async function fetchMeasurementRange(powermeter_id, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/measurementRange?powermeter_id=${powermeter_id}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchMeasurementRange: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch measurement range');
  }

  return resData;
}

// Fetch real-time data
export async function fetchRealTimeData(user_id, powermeter_id, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/fetchRealTimeData?user_id=${user_id}&powermeter_id=${powermeter_id}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchRealTimeData: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch real-time data');
  }

  return resData;
}

// Fetch powermeter info
// add here...

// Fetch consumption history
export async function fetchConsumptionHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/consumptionHistory?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchConsumptionHistory: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch consumption history');
  }
  return resData;
}

// Fetch demand history
export async function fetchDemandHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demandHistory?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchDemandHistory: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch demand history');
  }
  return resData;
}

// Fetch consumption profile
export async function fetchConsumptionProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/consumptionProfile?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchConsumptionProfile: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch consumption profile');
  }
  return resData;
}

// Fetch demand profile
export async function fetchDemandProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demandProfile?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchDemandProfile: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch demand profile');
  }
  return resData;
}