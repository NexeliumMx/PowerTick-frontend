// MUI Imports
import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid2";
import { useTranslation } from 'react-i18next';

// Context
import { ModeContext } from "../../../context/AppModeContext";

// Components
import DemandProfileCard from "../components/cards/DemandProfileCard";
import DemandHistoryCard from "../components/cards/DemandHistoryCard";
import ConsumptionProfileCard from "../components/cards/ConsumptionProfileCard";
import ConsumptionHistoryCard from "../components/cards/ConsumptionHistoryCard";

// Hooks
import { useMeasurementRange } from '../../../hooks/useMeasurementRange';

// Date handling
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const Analysis = ({ powerMeter }) => {
  const { t } = useTranslation();
  const { state } = useContext(ModeContext);
  const { data: measurementRange, isLoading: isRangeLoading, error: rangeError } = useMeasurementRange(powerMeter, state.mode);

  // Default time filter state (latest available)
  const [defaultTimeFilter, setDefaultTimeFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours(),
  });

  useEffect(() => {
    if (measurementRange && measurementRange.max_utc) {
      const tz = dayjs.tz.guess();
      const max = dayjs.utc(measurementRange.max_utc).tz(tz);
      setDefaultTimeFilter({
        year: max.year(),
        month: max.month() + 1,
        day: max.date(),
        hour: max.hour(),
      });
    }
  }, [measurementRange]);

  // Responsive logic
  const isSmallScreen = useMediaQuery("(max-width:960px)"); // Adjust breakpoint as needed

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Optionally show loading/error for measurement range */}
      {isRangeLoading && <div>{t('dashboard.loadingMeasurementRange', 'Loading measurement range...')}</div>}
      {rangeError && <div>{t('dashboard.errorLoadingMeasurementRange', { error: rangeError.message })}</div>}
      <Grid container spacing={2}>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ConsumptionHistoryCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <DemandHistoryCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ConsumptionProfileCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <DemandProfileCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analysis;