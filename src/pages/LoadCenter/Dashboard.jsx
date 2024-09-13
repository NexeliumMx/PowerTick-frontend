import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const [maxDemandPeriod, setMaxDemandPeriod] = useState("daily"); // Track the selected time period for Max Demand
  const [accumulatedPeriod, setAccumulatedPeriod] = useState("daily"); // Track the selected time period for Accumulated Consumption

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod); // Update Max Demand period
    }
  };

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod); // Update Accumulated Consumption period
    }
  };

  // Dummy data for the LineChart (Demand Profile)
  const demandProfileData = [
    { x: "January", y: 240 },
    { x: "February", y: 720 },
    { x: "March", y: 480 },
    { x: "April", y: 360 },
    { x: "May", y: 300 },
    { x: "June", y: 450 },
    { x: "July", y: 260 },
    { x: "August", y: 750 },
    { x: "September", y: 320 },
    { x: "October", y: 600 },
    { x: "November", y: 400 },
    { x: "December", y: 550 },
  ];

  const uData = demandProfileData.map((item) => item.y); // Extract y-values
  const xLabels = demandProfileData.map((item) => item.x); // Extract x-axis labels

  return (
    <Box sx={{ flexGrow: 1, padding: "16px" }}>
      {/* First row of 4 cards */}
      <Grid container spacing={2}>
        {/* Max Demand */}
        <Grid xs={12} md={6} lg={3}>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <Card sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Max Demand
                </Typography>
                <Typography variant="h4" color="primary">
                  10,000 kW
                </Typography>

                {/* Action Buttons for Max Demand */}
                <ToggleButtonGroup
                  value={maxDemandPeriod}
                  exclusive
                  onChange={handleMaxDemandPeriodChange}
                  aria-label="Max Demand Time Period"
                  sx={{ mt: 2 }} // Add some margin top for spacing
                >
                  <ToggleButton value="daily" aria-label="Daily">
                    Daily
                  </ToggleButton>
                  <ToggleButton value="monthly" aria-label="Monthly">
                    Monthly
                  </ToggleButton>
                  <ToggleButton value="yearly" aria-label="Yearly">
                    Yearly
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Accumulated Consumption */}
        <Grid xs={12} md={6} lg={3}>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <Card sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Accumulated Consumption
                </Typography>
                <Typography variant="h4" color="primary">
                  70,000 kWh
                </Typography>

                {/* Action Buttons for Accumulated Consumption */}
                <ToggleButtonGroup
                  value={accumulatedPeriod}
                  exclusive
                  onChange={handleAccumulatedPeriodChange}
                  aria-label="Accumulated Consumption Time Period"
                  sx={{ mt: 2 }} // Add some margin top for spacing
                >
                  <ToggleButton value="daily" aria-label="Daily">
                    Daily
                  </ToggleButton>
                  <ToggleButton value="monthly" aria-label="Monthly">
                    Monthly
                  </ToggleButton>
                  <ToggleButton value="yearly" aria-label="Yearly">
                    Yearly
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Power Factor */}
        <Grid xs={12} md={6} lg={3}>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <Card sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Power Factor
                </Typography>
                <Typography variant="h4" color="primary">
                  0.75
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Timestamp */}
        <Grid xs={12} md={6} lg={3}>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            <Card sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Timestamp
                </Typography>
                <Typography variant="h4" color="primary">
                  03 de Agosto de 2024 17:23
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Second row of 2 cards */}
      <Box sx={{ marginTop: "32px" }}>
        <Grid container spacing={2}>
          {/* Demand Profile with LineChart */}
          <Grid xs={12} md={6}>
            <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Demand Profile
                  </Typography>
                  <LineChart
                    width={500}
                    height={300}
                    series={[
                      {
                        data: uData, // Feed the transformed y-values here
                        label: "kW",
                        area: true,
                        showMark: false,
                        curve: "linear",
                      },
                    ]}
                    xAxis={[
                      {
                        scaleType: "point",
                        data: xLabels, // Feed the transformed x-axis labels here
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Consumption History */}
          <Grid xs={12} md={6}>
            <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Consumption History
                  </Typography>
                  {/* Add content for Consumption History here */}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
