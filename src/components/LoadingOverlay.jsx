import { Box, CircularProgress, Typography, useTheme, } from "@mui/material";

const LoadingOverlay = ({ loading }) => {
  const theme = useTheme();

  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
        display: "flex",
        flexDirection: "column", // Arrange items vertically
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, // Above other elements
      }}
    >
      {/* Circular Progress */}
      <CircularProgress color="white" size={80} /> {/* Increased size */}

      {/* Message below the spinner */}
      <Typography
        variant="h6"
        sx={{ marginTop: 2 }} // Add spacing between the spinner and the text
      >
        Please Wait
      </Typography>
    </Box>
  );
};

export default LoadingOverlay;