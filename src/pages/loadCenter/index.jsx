import { Box, Typography, Card, CardActions, Button, Grid2, CardContent, Stack, CircularProgress } from "@mui/material";
import Header from "../../components/ui/Header";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { fetchPowermetersByUserAccess } from "../../services/api/httpRequests";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { usePowermeters } from '../../services/query/usePowermeters';
import { useNavigate } from 'react-router-dom';

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

const LoadCenter = () => {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { data: powermetersData, isLoading, error } = usePowermeters(user_id);
  const navigate = useNavigate();

  // Group powermeters by installation
  const installations = powermetersData ? groupByInstallation(powermetersData) : {};

  return (
    <Box m="20px">
      <Header
        title="LOAD CENTERS"
        subtitle="Overview and Management of Energy Distribution and Consumption"
      />
      <Box>
        {isLoading || !powermetersData ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          Object.entries(installations).map(([installationId, { installation_alias, meters }]) => (
            <Box key={installationId} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {installation_alias || "Sin alias"}
              </Typography>
              <Grid2 container spacing={2}>
                {meters.map((item) => (
                  <Grid2 key={item.serial_number} xs={12} sm={6} md={3}>
                    <Card sx={{ minWidth: 275, padding: 1 }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          {item.powermeter_alias || "Sin alias"}
                        </Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                          <Gauge
                            width={100}
                            height={100}
                            value={60}
                            sx={{
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#82ca9d',
                              },
                            }}
                          />
                          <Gauge
                            width={100}
                            height={100}
                            value={60}
                            startAngle={-90}
                            endAngle={90}
                            sx={{
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: '#8884d8',
                              },
                            }}
                          />
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button 
                          variant="contained" 
                          size="small"
                          onClick={() => navigate(`/dashboard?serial_number=${item.serial_number}`)}
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