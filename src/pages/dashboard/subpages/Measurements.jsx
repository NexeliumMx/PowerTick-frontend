// MUI Components
// MUI Components
import Grid2 from "@mui/material/Grid2";
import { Box } from "@mui/material";

// Context
import { ModeContext } from "../../../context/AppModeContext";

// Hooks
import { useMsal } from "@azure/msal-react";
import { useApiData } from "../../../hooks/useApiData";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';

// Components for measurements
import Currents from "../components/cards/Currents";
import VoltageLN from "../components/cards/VoltageLN";
import VoltageLL from "../components/cards/VoltageLL";
import RealPower from "../components/cards/RealPower";
import ReactivePower from "../components/cards/ReactivePower";
import PowerFactor from "../components/cards/PowerFactor";
import THDCurrent from "../components/cards/THDCurrent";
import THDVoltageLN from "../components/cards/THDVoltageLN";
import THDVoltageLL from "../components/cards/THDVoltageLL";
import EnergyExported from "../components/cards/EnergyExported";
import EnergyImported from "../components/cards/EnergyImported";
import Power from "../components/cards/Power";

export default function Measurements({ powerMeter }) {
  const { t } = useTranslation();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { state } = useContext(ModeContext); // Get current mode from context
  const api = useApiData();
  const { data: realTimeData, isLoading } = api.realTimeData(user_id, powerMeter, state.mode); // Use the new API hook
  const parsedData = Array.isArray(realTimeData) ? realTimeData[0] : realTimeData===undefined? realTimeData : realTimeData?.data;

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <RealPower data={parsedData} title={t('measurements.realPower')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <ReactivePower data={parsedData} title={t('measurements.reactivePower')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Currents data={parsedData} title={t('measurements.currents')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <PowerFactor data={parsedData} title={t('measurements.powerFactorRange')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageLN data={parsedData} title={t('measurements.voltageLN')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageLL data={parsedData} title={t('measurements.voltageLL')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDCurrent data={parsedData} title={t('measurements.thdCurrent')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDVoltageLN data={parsedData} title={t('measurements.thdVoltageLN')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDVoltageLL data={parsedData} title={t('measurements.thdVoltageLL')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <EnergyImported data={parsedData} title={t('measurements.energyImported')} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <EnergyExported data={parsedData} title={t('measurements.energyExported')} />
        </Grid2>
        
      </Grid2>
    </Box>
  );
}