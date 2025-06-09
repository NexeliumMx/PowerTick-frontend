import { Box, Typography, Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Currents from "../components/cards/Currents";
import VoltageLN from "../components/cards/VoltageLN";
import VoltageLL from "../components/cards/VoltageLL";
import RealPower from "../components/cards/RealPower";
import ReactivePower from "../components/cards/ReactivePower";
import PowerFactor from "../components/cards/PowerFactor";
import { useMsal } from "@azure/msal-react";
import { useRealTimeData } from "../../../hooks/useRealTimeData";
import { useContext } from "react";
import { ModeContext } from "../../../context/AppModeContext";
import THDCurrent from "../components/cards/THDCurrent";
import THDVoltageLN from "../components/cards/THDVoltageLN";
import THDVoltageLL from "../components/cards/THDVoltageLL";
import EnergyExported from "../components/cards/EnergyExported";
import EnergyImported from "../components/cards/EnergyImported";
import Power from "../components/cards/Power";

export default function Measurements({ powerMeter }) {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { state } = useContext(ModeContext); // Get current mode from context
  const { data: realTimeData, isLoading } = useRealTimeData(user_id, powerMeter, state.mode); // Pass mode
  const parsedData = Array.isArray(realTimeData) ? realTimeData[0] : realTimeData;

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <RealPower data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <ReactivePower data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Currents data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <PowerFactor data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageLN data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageLL data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDCurrent data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDVoltageLN data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <THDVoltageLL data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <EnergyImported data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <EnergyExported data={parsedData} />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Power data={parsedData} />
        </Grid2>
      </Grid2>
    </Box>
  );
}
