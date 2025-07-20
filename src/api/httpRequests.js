/**
 * FileName: src/services/api/httpRequests.js
 * Author(s): Arturo Vargas
 * Brief: Provides the API request functions for the application.
 * Date: 2025-06-01
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { apiEndpoints, API_BASE_URL } from './apiEndpoints.js';

// Accepts an optional 'mode' argument: 'DEMO', 'DEV', or 'PRODUCTION'

// Fetch powermeters by user access
export async function fetchPowermetersByUserAccess(user_id, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.fetchPowermetersByUserAccess}?user_id=${user_id}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.measurementRange}?powermeter_id=${powermeter_id}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.fetchRealTimeData}?user_id=${user_id}&powermeter_id=${powermeter_id}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.consumptionHistory}?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.demandHistory}?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.consumptionProfile}?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
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
  let url = `${API_BASE_URL}${apiEndpoints.demandProfile}?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
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


// Fetch monthly report
export async function fetchMonthlyReport(user_id, powermeter_id, year, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.monthlyReport}?user_id=${user_id}&powermeter_id=${powermeter_id}&year=${year}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchMonthlyReport: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch monthly report');
  }
  return resData;
}

// Fetch load centers
export async function fetchLoadCenters(user_id, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.loadCenters}?user_id=${user_id}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchLoadCenters: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch load centers');
  }
  return resData;
}

// Fetch THD Current History (cloned from fetchDemandHistory)
export async function fetchThdCurrentHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdCurrentHistory}?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdCurrentHistory: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD current history');
  }
  return resData;
}

// Fetch THD Current Profile (cloned from fetchDemandProfile)
export async function fetchThdCurrentProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdCurrentProfile}?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdCurrentProfile: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD current profile');
  }
  return resData;
}

// Fetch THD Voltage LL History (cloned from fetchDemandHistory)
export async function fetchThdVoltageLLHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdVoltageLLHistory}?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdVoltageLLHistory: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD voltage LL history');
  }
  return resData;
}

// Fetch THD Voltage LL Profile (cloned from fetchDemandProfile)
export async function fetchThdVoltageLLProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdVoltageLLProfile}?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdVoltageLLProfile: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD voltage LL profile');
  }
  return resData;
}

// Fetch THD Voltage LN History (cloned from fetchDemandHistory)
export async function fetchThdVoltageLNHistory(user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdVoltageLNHistory}?user_id=${user_id}&powermeter_id=${powermeter_id}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdVoltageLNHistory: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD voltage LN history');
  }
  return resData;
}

// Fetch THD Voltage LN Profile (cloned from fetchDemandProfile)
export async function fetchThdVoltageLNProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.thdVoltageLNProfile}?user_id=${user_id}&powermeter_id=${powermeter_id}&time_interval=${time_interval}&start_utc=${start_utc}&end_utc=${end_utc}`;
  if (mode === 'DEMO') {
    url += "&enviroment=demo";
  } else if (mode === 'DEV') {
    url += "&enviroment=dev";
  }
  console.log(`[API CALL] fetchThdVoltageLNProfile: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch THD voltage LN profile');
  }
  return resData;
}

// ========== NEWLY ADDED ENDPOINTS - VERIFY PARAMETERS ========== //

// Fetch powermeter info (POST/GET endpoint)
// TODO: Verify required parameters for this endpoint
export async function fetchPowermeter(powermeter_id = null, mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.powermeter}`;
  if (powermeter_id) {
    url += `?powermeter_id=${powermeter_id}`;
  }
  if (mode === 'DEMO') {
    url += (url.includes('?') ? '&' : '?') + "enviroment=demo";
  } else if (mode === 'DEV') {
    url += (url.includes('?') ? '&' : '?') + "enviroment=dev";
  }
  console.log(`[API CALL] fetchPowermeter: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to fetch powermeter');
  }
  return resData;
}

// Test database connection
// TODO: Verify required parameters for this endpoint
export async function testDBConnection(mode = 'PRODUCTION') {
  let url = `${API_BASE_URL}${apiEndpoints.testDBconnection}`;
  if (mode === 'DEMO') {
    url += (url.includes('?') ? '&' : '?') + "enviroment=demo";
  } else if (mode === 'DEV') {
    url += (url.includes('?') ? '&' : '?') + "enviroment=dev";
  }
  console.log(`[API CALL] testDBConnection: ${url}`);
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error('Failed to test database connection');
  }
  return resData;
}
export async function downloadCsv({
  userId,
  powermeterId,
  powermeterAlias,
  month,
  year,
  environment = 'production',
  language = 'en',
}) {
  const params = new URLSearchParams({
    user_id: userId,
    powermeter_id: powermeterId,
    month,
    year,
    environment,
    language,
  });

  const url = `/api/downloads?${params.toString()}`;
  console.log(`[API CALL] downloadCsv: ${url}`);

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to download CSV');
  }

  const blob = await response.blob();
  const safeAlias = powermeterAlias.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
  const filename = `${safeAlias}_${month}_${year}.csv`;

  const link = document.createElement('a');
  const objectUrl = window.URL.createObjectURL(blob);
  link.href = objectUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(objectUrl);
}