import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DataChartError = ({ errorCode, errorMessage }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <WarningAmberIcon sx={{ fontSize: 80 }} />
      <Typography variant="h4" sx={{ marginTop: "16px" }}>
        Error
      </Typography>
      <Typography
        variant="h6"
        color="error"
        sx={{ marginTop: "8px", textAlign: "center" }}
      >
        {`${errorCode || "Unknown"}: ${errorMessage || "An unknown error occurred"}`}
      </Typography>
    </Box>
  );
};

export default DataChartError;