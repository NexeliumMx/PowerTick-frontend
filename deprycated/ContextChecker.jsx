import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ModeContext } from "../context/AppModeContext";

const ContextChecker = () => {
  const { state } = useContext(ModeContext);

  return (
    <Box
      sx={{
        padding: "16px",
        borderRadius: "8px",
        marginTop: "16px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="textPrimary">
        Active Mode: {state.mode.replace("_", " ")}
      </Typography>
    </Box>
  );
};

export default ContextChecker;