import { Box, CircularProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const Loading = () => {
  const [loadingText, setLoadingText] = useState("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) =>
        prev === "loading..."
          ? "loading"
          : prev === "loading"
          ? "loading."
          : prev === "loading."
          ? "loading.."
          : "loading..."
      );
    }, 500); // Change the text every 500ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {loadingText}
      </Typography>
    </Box>
  );
};

export default Loading;