import { Box, Typography, Card, CardActions, Button, Grid2, CardContent, Stack, CircularProgress } from "@mui/material";
import Header from "../../components/ui/Header";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { fetchPowermetersByUserAccess } from "../../services/api/httpRequests";
import { Gauge } from '@mui/x-charts/Gauge';

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
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { instance, accounts } = useMsal();
  const [powermetersData, setPowermetersData] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];

      instance
        .acquireTokenSilent({
          scopes: ["openid", "profile", "email"],
          account: account,
        })
        .then((response) => {
          const claims = response.idTokenClaims;
          const objectId = claims.oid || null;

          if (objectId) {
            fetchPowermetersByUserAccess(objectId)
              .then((data) => {
                setPowermetersData(data);
                setTimeout(() => {
                  setShowSkeleton(false);
                }, 1000);
              })
              .catch((error) => {
                console.error("Error fetching powermeters:", error);
                setShowSkeleton(false);
              });
          } else {
            console.error("Object ID not found in token claims.");
            setShowSkeleton(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching token claims:", error);
          setShowSkeleton(false);
        });
    }
  }, [accounts, instance]);

  // Group powermeters by installation
  const installations = powermetersData ? groupByInstallation(powermetersData) : {};

  return (
    <Box m="20px">
      <Header
        title="LOAD CENTERS"
        subtitle="Overview and Management of Energy Distribution and Consumption"
      />
      <Box>
        {showSkeleton || !powermetersData ? (
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
                          <Gauge width={100} height={100} value={60} />
                          <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} />
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" size="small">Go to dashboard</Button>
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