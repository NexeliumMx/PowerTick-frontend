import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const mockDataDownloads = [
  {
    id: 1,
    client: "Client A",
    location: "Mexico City",
    substation: "Substation 1",
    loadCenter: "Center 1",
    month: "January",
    year: 2023,
  },
  {
    id: 2,
    client: "Client B",
    location: "Guadalajara",
    substation: "Substation 2",
    loadCenter: "Center 2",
    month: "February",
    year: 2023,
  },
  {
    id: 3,
    client: "Client C",
    location: "Monterrey",
    substation: "Substation 3",
    loadCenter: "Center 3",
    month: "March",
    year: 2023,
  },
  {
    id: 4,
    client: "Client D",
    location: "Puebla",
    substation: "Substation 4",
    loadCenter: "Center 4",
    month: "April",
    year: 2023,
  },
  {
    id: 5,
    client: "Client E",
    location: "Tijuana",
    substation: "Substation 5",
    loadCenter: "Center 5",
    month: "May",
    year: 2023,
  },
];

const DownloadsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "substation",
      headerName: "Substation",
      flex: 1,
    },
    {
      field: "loadCenter",
      headerName: "Load Center",
      flex: 1,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
      type: "number",
    },
    {
      field: "file",
      headerName: "File",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <DownloadOutlinedIcon />
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid checkboxSelection rows={mockDataDownloads} columns={columns} />
    </Box>
  );
};

export default DownloadsTable;
