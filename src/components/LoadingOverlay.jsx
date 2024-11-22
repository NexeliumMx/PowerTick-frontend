import { Box, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ loading }) => {
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
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, // Above other elements
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingOverlay;