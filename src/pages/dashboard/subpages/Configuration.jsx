import React, { useEffect, useState, useContext } from "react";
import { Box, Card, CardHeader, CardContent, Typography, IconButton, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchMeterInfo, updatePowermeterAlias, updateInstallationAlias } from "../../../api/httpRequests";
import { useMsal } from "@azure/msal-react";
import { ModeContext } from "../../../context/AppModeContext";
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const Configuration = ({ powerMeter }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { accounts } = useMsal();
  const userId = accounts[0]?.idTokenClaims?.oid;
  const { state } = useContext(ModeContext);
  const mode = state?.mode;
  const [meterInfo, setMeterInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingAlias, setEditingAlias] = useState(false);
  const [aliasInput, setAliasInput] = useState('');
  const [savingAlias, setSavingAlias] = useState(false);
  const [editingInstallationAlias, setEditingInstallationAlias] = useState(false);
  const [installationAliasInput, setInstallationAliasInput] = useState('');
  const [savingInstallationAlias, setSavingInstallationAlias] = useState(false);

  const { t } = useTranslation();
  useEffect(() => {
    // Log parameters for fetchMeterInfo
    console.log('fetchMeterInfo params:', { userId, powerMeter, mode });
    if (!userId || !powerMeter || !mode) return;
    setLoading(true);
    setError(null);
    fetchMeterInfo(userId, powerMeter, mode)
      .then((data) => {
        setMeterInfo(data);
        setAliasInput(data[0]?.powermeter_alias || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, powerMeter, mode]);

  const handleEditAlias = () => {
    setEditingAlias(true);
    setAliasInput(meterInfo[0]?.powermeter_alias || '');
  };

  const handleAliasInputChange = (e) => {
    setAliasInput(e.target.value);
  };


  const handleEditInstallationAlias = () => {
    setEditingInstallationAlias(true);
    setInstallationAliasInput(meterInfo[0]?.installation_alias || '');
  };

  const handleInstallationAliasInputChange = (e) => {
    setInstallationAliasInput(e.target.value);
  };

  const handleSaveInstallationAlias = async () => {
    const installationId = meterInfo[0]?.installation_id;
    console.log('updateInstallationAlias params:', { userId, installationId, installationAliasInput, mode });
    if (!installationAliasInput.trim() || !installationId) return;
    setSavingInstallationAlias(true);
    try {
      await updateInstallationAlias(userId, installationId, installationAliasInput, mode);
      const updatedInfo = await fetchMeterInfo(userId, powerMeter, mode);
      setMeterInfo(updatedInfo);
      setEditingInstallationAlias(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingInstallationAlias(false);
    }
  };

  const handleSaveAlias = async () => {
    // Log parameters for updatePowermeterAlias
    console.log('updatePowermeterAlias params:', { userId, powerMeter, aliasInput, mode });
    if (!aliasInput.trim()) return;
    setSavingAlias(true);
    try {
      await updatePowermeterAlias(userId, powerMeter, aliasInput, mode);
      // Refresh info after update
      const updatedInfo = await fetchMeterInfo(userId, powerMeter, mode);
      setMeterInfo(updatedInfo);
      setEditingAlias(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingAlias(false);
    }
  };

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
          {/* Powermeter Alias with edit functionality */}
          <Grid size={isSmallScreen ? 12 : 6}>
            <Card sx={{ backgroundColor: theme.palette.background.card }}>
              <CardHeader
                title={t('configuration.powermeterAlias')}
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
                action={
                  !editingAlias && (
                    <IconButton
                      aria-label={t('configuration.editAlias', 'Edit Alias')}
                      onClick={handleEditAlias}
                      size="large"
                    >
                      <EditIcon />
                    </IconButton>
                  )
                }
              />
              <CardContent>
                {editingAlias ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      value={aliasInput}
                      onChange={handleAliasInputChange}
                      size="small"
                      variant="outlined"
                      disabled={savingAlias}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveAlias}
                      disabled={savingAlias}
                      startIcon={<SaveIcon />}
                    >
                      {t('configuration.save', 'Save')}
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    {meterInfo && meterInfo[0]?.powermeter_alias
                      ? meterInfo[0].powermeter_alias
                      : t('dashboard.dataNotAvailable')}
                  </Typography>
                )}
                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

{/* Installation Alias with edit functionality */}
<Grid size={isSmallScreen ? 12 : 6}>
  <Card sx={{ backgroundColor: theme.palette.background.card }}>
    <CardHeader
      title={t('configuration.installationAlias')}
      titleTypographyProps={{
        variant: "h3",
        fontWeight: "bold",
      }}
      action={
        !editingInstallationAlias && (
          <IconButton
            aria-label={t('configuration.editInstallationAlias', 'Edit Installation Alias')}
            onClick={handleEditInstallationAlias}
            size="large"
          >
            <EditIcon />
          </IconButton>
        )
      }
    />
    <CardContent>
      {editingInstallationAlias ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            value={installationAliasInput}
            onChange={handleInstallationAliasInputChange}
            size="small"
            variant="outlined"
            disabled={savingInstallationAlias}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveInstallationAlias}
            disabled={savingInstallationAlias}
            startIcon={<SaveIcon />}
          >
            {t('configuration.save', 'Save')}
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary">
          {meterInfo && meterInfo[0]?.installation_alias
            ? meterInfo[0].installation_alias
            : t('dashboard.dataNotAvailable')}
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
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
