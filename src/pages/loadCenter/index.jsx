// MUi imports
import { Box, Typography, Card, CardActions, Button, Grid2, CardContent, Stack, CircularProgress, Divider } from "@mui/material";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useTheme } from "@mui/material/styles";

// Components
import Header from "../../layout/Header";

// Import chart colors
import chartColors from "../../theme/chartColors";

// Context imports
import { ModeContext } from "../../context/AppModeContext";

//Hooks
import { useMsal } from "@azure/msal-react";
import { useContext } from "react";
import { useApiData } from '../../hooks/useApiData';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


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
  
  if (value >= 950) return chartColors.powerFactorGood;     // Green
  if (value >= 920) return chartColors.powerFactorModerate; // Yellow
  if (value >= 900) return chartColors.powerFactorRisky;    // Orange
  return chartColors.powerFactorPoor;                       // Red
};

const getColorByDemand = (demand, avg_demand) => {
  if (!demand || !avg_demand) return chartColors.undefined;
  const discrepance = Math.abs(demand-avg_demand);
  if (discrepance > avg_demand*0.3) return chartColors.peak;
  if (discrepance > avg_demand*0.15) return chartColors.semipeak;
  return chartColors.nopeak;
};
const demand_kw = 1000;
const capacity_kw = 900;

const LoadCenter = () => {
  const { t } = useTranslation();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { state } = useContext(ModeContext); // get mode from context
  // Only call the hook if user_id and state.mode are defined
  const hookEnabled = !!user_id && !!state.mode;
  const { powermetersByUserAccess, loadCenters } = useApiData();
  const { data: powermetersData, isLoading, error } = powermetersByUserAccess(user_id, state.mode, { enabled: hookEnabled });
  const { data: loadCentersData, isDataLoading, error: loadCenterStatsError } = loadCenters(user_id, state.mode, { enabled: hookEnabled });
  const navigate = useNavigate();
  const theme = useTheme();

  const statsByPowermeterId = (loadCentersData || []).reduce((acc, stat) => {
    acc[stat.powermeter_id] = stat;
    return acc;
  }, {});
  const powermetersWithStats = (powermetersData || []).map((pm) => ({
    ...pm,
    ...statsByPowermeterId[pm.powermeter_id], // merges consumption, avg_demand, max_demand, avg_power_factor, etc.
  }));
  const installations = groupByInstallation(powermetersWithStats);
  return (
    <Box sx={{ minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          pt: 2,
        }}
      >
        <Header
          title={t('loadCenter.title')}
          subtitle={t('loadCenter.subtitle')}
        />
      </Box>
      <Box>
        {error ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography color="error">{t('loadCenter.errorLoading', { error: error.message || String(error) })}</Typography>
          </Box>
        ) : isLoading || !powermetersData ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="secondary" />
          </Box>
        ) : Array.isArray(powermetersData) && powermetersData.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>{t('loadCenter.noPowermeters')}</Typography>
          </Box>
        ) : (
          Object.entries(installations).map(([installationId, { installation_alias, meters }]) => (
            <Box key={installationId} sx={{ mb: 4 }}>
              <Divider
                variant="fullWidth"
                sx={{
                  my: 2,
                  borderColor: theme.palette.text.secondary,
                  borderBottomWidth: 2,
                  opacity: 0.7,
                }}
              />
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {installation_alias || t('loadCenter.noAlias')}
              </Typography>
              
              

              <Grid2 container spacing={2}>
                {meters.map((item) => {
                  // If there is no load center data for this powermeter, show a message and the button only
                  const hasStats =
                    typeof item.consumption === 'number' ||
                    typeof item.avg_demand === 'number' ||
                    typeof item.max_demand === 'number' ||
                    typeof item.avg_power_factor === 'number';

                  return (
                    <Grid2 key={item.serial_number} xs={12} sm={6} md={3}>
                      <Card
                        sx={{
                          minWidth: 275,
                          px: 1,
                          backgroundColor: theme.palette.background.card,
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            {item.powermeter_alias || t('loadCenter.noAlias')}
                          </Typography>
                          {!hasStats ? (
                            <Box
                              sx={{
                                minHeight: 120,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography variant="h4" color="text.secondary" sx={{ mb: 2 }}>
                                No hay datos de este mes
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Box
                                sx={{
                                  my: 2,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor: theme.palette.background.paper,
                                  borderRadius: 2,
                                  py: 1,
                                  px: 2,
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
                                >
                                  Consumo acumulado
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ mt: 1, color: theme.palette.text.primary }}
                                >
                                  {item.consumption} kWh
                                </Typography>
                              </Box>
                              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }} alignItems="center">
                                <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
                                  <Gauge
                                    width={100}
                                    height={100}
                                    value={item.avg_power_factor ? Number((item.avg_power_factor / 1000).toFixed(3)) : 0}
                                    valueMin={0}
                                    valueMax={100}
                                    startAngle={-110}
                                    endAngle={110}
                                    valueFormatter={(value) => Math.round(value).toString()} // No decimals
                                    sx={{
                                      [`& .${gaugeClasses.valueArc}`]: {
                                        fill: getColorByFP(item.avg_power_factor ?? 0),
                                      },
                                      [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 18,
                                      },
                                    }}
                                  />
                                  <Typography variant="body2" sx={{ textAlign: 'center', mt: 0 }}>
                                    {t('loadCenter.powerFactor')}
                                  </Typography>
                                </Box>
                                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: { xs: 0, md: 2 } }} />
                                <Divider orientation="horizontsal" variant="middle" flexItem sx={{ mx: { xs: 2, md: 0 } }} />
                                <Box sx={{ flexDirection: 'column', alignItems: 'center' }}>
                                  <Box sx={{ position: 'relative', width: 100, height: 100, display: 'inline-block' }}>
                                    <Gauge
                                      width={100}
                                      height={100}
                                      value={item.last_demand ?? 0}
                                      valueMin={0}
                                      valueMax={item.avg_demand ? item.avg_demand * 2 : 1}
                                      startAngle={-110}
                                      endAngle={110}
                                      text={({ value }) => `${value.toFixed(0)} kW`}
                                      sx={{
                                        [`& .${gaugeClasses.valueArc}`]: {
                                          fill: getColorByDemand(item.last_demand, item.avg_demand),
                                        },
                                        [`& .${gaugeClasses.valueText}`]: {
                                          fontSize: 16,
                                        },
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        pointerEvents: 'none',
                                      }}
                                    >
                                      <Typography variant="caption">
                                        AVG
                                      </Typography>
                                    </Box>
                                    <svg
                                      width={100}
                                      height={100}
                                      style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 0,
                                        pointerEvents: 'none',
                                      }}
                                    >
                                      <line
                                        x1={50}
                                        y1={12}
                                        x2={50}
                                        y2={28}
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </Box>

                                  <Typography variant="body2" sx={{ textAlign: 'center', mt: 0 }}>
                                    {t('loadCenter.demand')}
                                  </Typography>
                                </Box>
                              </Stack>
                            </>
                          )}
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/dashboard?powermeter_id=${item.powermeter_id}`)}
                          >
                            {t('loadCenter.goToDashboard')}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid2>
                  );
                })}
              </Grid2>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default LoadCenter;