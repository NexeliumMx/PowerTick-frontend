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

export default function Measurements({ powerMeter }) {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { data: realTimeData, isLoading } = useRealTimeData(user_id, powerMeter);
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
      </Grid2>
    </Box>
  );
}
