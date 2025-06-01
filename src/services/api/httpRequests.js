/**
 * FileName: src/services/api/httpRequests.js
 * Author(s): Arturo Vargas
 * Brief: Provides the API request functions for the application.
 * Date: 2025-06-01
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

// Fetch powermeters by user access
// Accepts an optional 'mode' argument: 'DEMO', 'DEV', or 'PRODUCTION'
export async function fetchPowermetersByUserAccess(user_id, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/fetchPowermetersByUserAccess?user_id=${user_id}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch powermeters by user access');
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
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch real-time data');
  }

  return resData;
}

// Fetch powermeter info
export async function fetchPowermeterInfo(user_id, serial_number, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/fetchPowermeterInfo?user_id=${user_id}&serial_number=${serial_number}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch powermeter info');
  }

  return resData;
}

// Fetch consumption history
export async function fetchConsumptionHistory(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demoConsumptionHistory?user_id=${user_id}&serial_number=${serial_number}&time_interval=${time_interval}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch consumption history');
  }

  return resData;
}

// Fetch consumption profile
export async function fetchConsumptionProfile(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demoConsumptionProfile?user_id=${user_id}&serial_number=${serial_number}&time_interval=${time_interval}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch consumption profile');
  }

  return resData;
}

// Fetch demand history
export async function fetchDemandHistory(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demoDemandHistory?user_id=${user_id}&serial_number=${serial_number}&time_interval=${time_interval}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch demand history');
  }

  return resData;
}

// Fetch demand profile
export async function fetchDemandProfile(user_id, serial_number, time_interval, mode = 'PRODUCTION') {
  let url = `https://power-tick-api-js.nexelium.mx/api/demoDemandProfile?user_id=${user_id}&serial_number=${serial_number}&time_interval=${time_interval}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  const response = await fetch(url);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch demand profile');
  }

  return resData;
}