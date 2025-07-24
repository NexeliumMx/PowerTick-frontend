import React, { useEffect, useState , useContext} from "react";

import { Box, Card, CardHeader, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchMeterInfo } from "../../../api/httpRequests";
import { useMsal } from "@azure/msal-react";
import { ModeContext } from "../../../context/AppModeContext"; 
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';




const Configuration = ({ powerMeter }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small
  const { accounts } = useMsal();
  const userId = accounts[0]?.idTokenClaims?.oid; 
    const { state } = useContext(ModeContext); // <-- Get mode from context
  const mode = state?.mode;
  const [meterInfo, setMeterInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!userId || !powerMeter|| !mode) return;
    setLoading(true);
    setError(null);
    fetchMeterInfo(userId, powerMeter, mode)
.then((data) => {
      console.log('Fetching Meter Info for user:', userId, 'powerMeter:', powerMeter, 'mode:', mode);
      console.log('Meter Info response:', data);
      setMeterInfo(data);
    })      
    .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, powerMeter]);
console.log('meterInfo:', meterInfo);

if (!powerMeter) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 300,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          {t('configuration.noPowermeterSelected')}
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        mt: 0,
        mb: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {/* ID */}
          <Grid size={isSmallScreen ? 12 : 6}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.powermeterAlias')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                {meterInfo && meterInfo[0]?.powermeter_alias
                  ? meterInfo[0].powermeter_alias
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Client */}
          <Grid size={isSmallScreen ? 12 : 6}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.installationAlias')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.installation_alias
                  ? meterInfo[0].installation_alias
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Location */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.tariff')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.tariff
                  ? meterInfo[0].tariff
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Load Center */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.region')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.region
                  ? meterInfo[0].region
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Model */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.installedCapacity')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.installed_capacity
                  ? meterInfo[0].installed_capacity
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Manufacturer */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.location')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.location
                  ? meterInfo[0].location
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Firmware Version */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.registrationDate')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.register_date
                  ? dayjs(meterInfo[0].register_date).format('YYYY-MM-DD')
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Serial Number */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.maintenanceDate')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.maintenance_date
                  ? dayjs(meterInfo[0].maintenance_date).format('YYYY-MM-DD')
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Registration Date */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title={t('configuration.allowedUsers')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  {meterInfo && meterInfo[0]?.user_count
                  ? meterInfo[0].user_count
                  : t('dashboard.dataNotAvailable')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Configuration;
