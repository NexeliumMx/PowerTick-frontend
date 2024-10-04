import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Error = () => {
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
    </Box>
  );
};

export default Error;