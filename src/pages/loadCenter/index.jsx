import { Box, Typography, Card, CardActions, Button, Grid2, CardContent, Stack, CircularProgress, Divider } from "@mui/material";
import Header from "../../components/ui/Header";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState, useContext } from "react";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import chartColors from "../../theme/chartColors";
import { ModeContext } from "../../context/AppModeContext";

//Hooks
import { usePowermetersByUserAccess } from '../../hooks/usePowermetersByUserAccess';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";


// Helper to group powermeters by installation_id
const groupByInstallation = (powermeters) => {
  if (!powermeters) return {};
  return powermeters.reduce((acc, meter) => {
    const id = meter.installation_id;
    if (!id) return acc;
    if (!acc[id]) {
      acc[id] = {
        installation_alias: meter.installation_alias,
        meters: [],
      };
    }
    acc[id].meters.push(meter);
    return acc;
  }, {});
};
const getColorByFP = (value) => {
  if (value >= 0.95) return chartColors.powerFactorGood;
  if (value >= 0.90) return chartColors.powerFactorModerate;
  return chartColors.powerFactorPoor;
};
const getColorByDemand = (demand_kw, capacity_kw) => {
  if (!capacity_kw || capacity_kw === 0) return chartColors.undefined;
  const ratio = capacity_kw/demand_kw;
  if (ratio > 3) return chartColors.overdimensioned;
  if (ratio > 1.3) return chartColors.welldimensioned;
  return chartColors.underdimensioned;
};
const demand_kw = 1000;
const capacity_kw = 900;

const LoadCenter = () => {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { state } = useContext(ModeContext); // get mode from context
  const { data: powermetersData, isLoading, error } = usePowermetersByUserAccess(user_id, state.mode);
  const navigate = useNavigate();
  const theme = useTheme();
  // Group powermeters by installation
  const installations = powermetersData ? groupByInstallation(powermetersData) : {};

  return (
    
    <Box sx={{ minHeight: "100vh", padding: "20px", boxSizing: "border-box" }}>
      <Box
    sx={{
      display: "flex",
      justifyContent:"flex-start",
      flexDirection:"column",
      pt: 2,
    }}
  >
        <Header
          title="LOAD CENTERS"
          subtitle="Overview and Management of Energy Distribution and Consumption"
        />
        </Box>
      <Box>
        {isLoading || !powermetersData ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          Object.entries(installations).map(([installationId, { installation_alias, meters }]) => (
            <Box key={installationId} sx={{ mb: 4 }}>
     <Divider
          variant="fullWidth"
          sx={{
            my: 2,
            borderColor:theme.palette.text.secondary,
            borderBottomWidth: 2,
            opacity: 0.7,
          }}
        />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {installation_alias || "Sin alias"}
              </Typography>
              <Grid2 container spacing={2}>
                {meters.map((item) => (
                  <Grid2 key={item.serial_number} xs={12} sm={6} md={3}>
                    <Card sx={{ minWidth: 275, px: 1 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 , fontWeight:600}}>
                          {item.powermeter_alias || "Sin alias"}
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }} alignItems={"center"}>
                          <Box sx={{flexDirection: 'column', alignItems: 'center'}}>
                          <Gauge
                            width={100}
                            height={100}
                            value={0.96}
                            valueMin={0}
                            valueMax={1}
                            startAngle={-110}
                            endAngle={110}
                            valueFormatter={value => value.toFixed(2)}
                            sx={{
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: getColorByFP(0.96), // Use actual value here
                              },
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 18,
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ textAlign: 'center', mt: 0 }}>
                            Power Factor
                          </Typography>
                          </Box>
                          <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: { xs: 0, md: 2 } }} />
                          <Divider orientation="horizontal" variant="middle" flexItem sx={{ mx: { xs: 2, md: 0 } }} />
                          <Box sx={{flexDirection: 'column', alignItems: 'center'}}>
                          <Gauge
                            width={100}
                            height={100}
                            value={Math.min(demand_kw, capacity_kw)}
                            valueMin={0}
                            valueMax={capacity_kw} 
                            startAngle={-110}
                            endAngle={110}
                            text={({ value }) => `${value.toFixed(0)} kW`} 
                            sx={{
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: getColorByDemand(demand_kw, capacity_kw),
                              },
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 16,
                              },
                            }}
                          />

                          <Typography variant="body2" sx={{ textAlign: 'center', mt: 0 }}>
                            Demand
                          </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button 
                          variant="contained" 
                          size="small"
                          onClick={() => navigate(`/dashboard?powermeter_id=${item.powermeter_id}`)}
                        >
                          Go to dashboard
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default LoadCenter;