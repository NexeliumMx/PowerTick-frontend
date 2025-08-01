// MUI Imports
import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid2";
import { useTranslation } from 'react-i18next';

// Context
import { ModeContext } from "../../../context/AppModeContext";

// Components
import DemandProfileCard from "../components/cards/DemandProfileCard";
import DemandHistoryCard from "../components/cards/DemandHistoryCard";
import ConsumptionProfileCard from "../components/cards/ConsumptionProfileCard";
import ConsumptionHistoryCard from "../components/cards/ConsumptionHistoryCard";
import ThdCurrentHistoryCard from "../components/cards/ThdCurrentHistoryCard";
import ThdCurrentProfileCard from "../components/cards/ThdCurrentProfileCard";
import ThdVoltageLLHistoryCard from "../components/cards/ThdVoltageLLHistoryCard";
import ThdVoltageLLProfileCard from "../components/cards/ThdVoltageLLProfileCard";
import ThdVoltageLNHistoryCard from "../components/cards/ThdVoltageLNHistoryCard";
import ThdVoltageLNProfileCard from "../components/cards/ThdVoltageLNProfileCard";
// Hooks
import { useApiData } from '../../../hooks/useApiData';

// Date handling
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const Analysis = ({ powerMeter }) => {
  const { t } = useTranslation();
  const { state } = useContext(ModeContext);
  const { measurementRange: useMeasurementRange } = useApiData();
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
      console.log('[DEBUG] measurementRange.max_utc:', measurementRange.max_utc);
      const tz = dayjs.tz.guess();
      const max = dayjs.utc(measurementRange.max_utc).tz(tz);
      console.log('[DEBUG] Parsed max date:', max.format());
      console.log('[DEBUG] Setting defaultTimeFilter to:', {
        year: max.year(),
        month: max.month() + 1,
        day: max.date(),
        hour: max.hour(),
      });
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
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdCurrentHistoryCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdCurrentProfileCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        {/* TO DO:
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdVoltageLLHistoryCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdVoltageLLProfileCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdVoltageLNHistoryCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6}>
          <ThdVoltageLNProfileCard selectedPowerMeter={powerMeter} measurementRange={measurementRange} defaultTimeFilter={defaultTimeFilter} t={t} />
        </Grid>
        */}
      </Grid>
    </Box>
  );
};

// PropTypes validation
Analysis.propTypes = {
  powerMeter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Analysis;