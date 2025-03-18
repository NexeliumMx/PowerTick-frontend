// Fetch powermeters by user access
export async function fetchPowermetersByUserAccess(user_id) {
  const response = await fetch(`https://power-tick-api-js.nexelium.mx/api/fetchPowermetersByUserAccess?user_id=${user_id}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch powermeters by user access');
  }

  return resData;
}

// Fetch real-time data
export async function fetchRealTimeData(user_id, serial_number) {
  const response = await fetch(`https://power-tick-api-js.nexelium.mx/api/fetchRealTimeData?user_id=${user_id}&serial_number=${serial_number}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch real-time data');
  }

  return resData;
}

// Fetch powermeter info
export async function fetchPowermeterInfo(user_id, serial_number) {
  const response = await fetch(`https://power-tick-api-js.nexelium.mx/api/fetchPowermeterInfo?user_id=${user_id}&serial_number=${serial_number}`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch powermeter info');
  }

  return resData;
}