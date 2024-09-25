import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DownloadIcon from '@mui/icons-material/Download'; // Example icon from MUI

const columns = [
  { field: 'client', headerName: 'Client', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'loadcenter', headerName: 'Load Center', width: 150 },
  { field: 'powermeter', headerName: 'Power Meter', width: 150 },
  { field: 'year', headerName: 'Year', width: 100 },
  { field: 'month', headerName: 'Month', width: 120 },
  {
    field: 'icon',
    headerName: 'File',
    width: 100,
    renderCell: () => (
      <DownloadIcon
        style={{ cursor: 'pointer', color: 'blue' }}
        onClick={() => alert('Download initiated!')}
      />
    ),
  },
];

// Example data for the last 12 months (assumes you're generating this dynamically)
const rows = [
  { id: 1, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'January' },
  { id: 2, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'February' },
  { id: 3, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'March' },
  { id: 4, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'April' },
  { id: 5, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'May' },
  { id: 6, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'June' },
  { id: 7, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'July' },
  { id: 8, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'August' },
  { id: 9, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'September' },
  { id: 10, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'October' },
  { id: 11, client: 'Client A', location: 'Location 1', loadcenter: 'LC 1', powermeter: 'PM 1', year: 2024, month: 'November' },
  { id: 12, client: 'Client B', location: 'Location 2', loadcenter: 'LC 2', powermeter: 'PM 2', year: 2024, month: 'December' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DownloadsTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
