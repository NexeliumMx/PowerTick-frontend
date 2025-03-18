/**
 * File: src/pages/home/index.jsx
 * Author(s): Arturo Vargas
 * Brief: Home page for the PowerTick React application.
 * Date: 2024-08-20
 *
 * Description:
 * This file serves as the main landing page for PowerTick. It provides navigation to the dashboard
 * and integrates authentication via Azure AD B2C using MSAL. A sign-in button allows users to log in.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 *
 * Version History:
 * - 2024-08-20: Initial file creation.
 * - 2024-09-11: Added version display and sign-in button.
 * - 2024-10-04: Updated version display to use environment variable.
 * - 2025-02-10: Implemented Sign-in button with MSAL authentication.
 */

import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      navigate("/load-center"); // Redirect to load-center if user is logged in
    }
  }, [accounts, navigate]);

  const handleLogin = () => {
    instance.loginRedirect().catch(error => {
      console.error("Login failed:", error);
    });
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "background.default",
        padding: 3,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to PowerTick
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Sign In
      </Button>
    </Box>
  );
}