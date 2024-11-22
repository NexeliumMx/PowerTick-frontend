import { DateTime } from "luxon";

export const formatConsumptionData = (data) => {
  if (!Array.isArray(data)) return [];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  return data.map((item) => {
    const month = DateTime.fromISO(item.timestamp, { zone: "America/Mexico_City" }).month;
    return {
      name: months[month - 1], // Map month number to short name
      Wh: item.total_real_energy_imported,
      VArh: item.total_var_hours_imported_q1,
    };
  });
};