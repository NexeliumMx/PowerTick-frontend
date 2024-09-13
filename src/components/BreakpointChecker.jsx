import React from "react";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";

const BreakpointChecker = () => {
  const theme = useTheme();

  // Check for different breakpoints
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  // Determine which breakpoint is active
  let activeBreakpoint = "Unknown";
  if (isXs) activeBreakpoint = "xs (extra-small)";
  if (isSm) activeBreakpoint = "sm (small)";
  if (isMd) activeBreakpoint = "md (medium)";
  if (isLg) activeBreakpoint = "lg (large)";
  if (isXl) activeBreakpoint = "xl (extra-large)";

  return (
    <Box sx={{ padding: "16px", backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h6">
        Active Breakpoint: {activeBreakpoint}
      </Typography>
    </Box>
  );
};

export default BreakpointChecker;