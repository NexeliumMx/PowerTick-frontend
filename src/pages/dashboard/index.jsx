// React imports
import { useState, useEffect, useContext } from "react";

// MUI imports
import { Box, Typography, Select, MenuItem } from "@mui/material";

//Components
import NavButtons from "./components/ui/NavButtons";
import Header from "../../components/ui/Header";

//Context
import { ModeContext } from "../../context/AppModeContext";

//Hooks
import { usePowermetersByUserAccess } from '../../hooks/usePowermetersByUserAccess';
import { useMsal } from "@azure/msal-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//Subpages
import Measurements from "./subpages/Measurements";
import Analysis from "./subpages/Analysis";
import Configuration from "./subpages/Configuration";


const Dashboard = () => {
  const { t } = useTranslation();
  const { state } = useContext(ModeContext);
  const { accounts } = useMsal ? useMsal() : { accounts: [] };
  const user_id = accounts && accounts[0]?.idTokenClaims?.oid;
  const { data: powerMeters = [], isLoading: isPowerMetersLoading, error: powerMetersError } = usePowermetersByUserAccess(user_id, state.mode);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [activePage, setActivePage] = useState("Measurements");
  const location = useLocation();

  // Set selectedPowerMeter from query param if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const powermeterIdFromQuery = params.get('powermeter_id');
    if (powermeterIdFromQuery && powerMeters.some(m => String(m.powermeter_id) === String(powermeterIdFromQuery))) {
      setSelectedPowerMeter(powermeterIdFromQuery);
    }
  }, [location.search, powerMeters]);

  const renderPage = () => {
    switch (activePage) {
      case "Analysis":
        return <Analysis powerMeter={selectedPowerMeter} />;
      case "Measurements":
        return <Measurements powerMeter={selectedPowerMeter} />;
      case "Configuration":
        return <Configuration powerMeter={selectedPowerMeter} />;
      default:
        return <Analysis powerMeter={selectedPowerMeter} />;
    }
  };

  if (state.mode === "LIVE_MODE") {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Dashboard is not available in LIVE mode.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", padding: "20px", boxSizing: "border-box" }}>
      {/* Header and Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {xs:"stretch", sm: "center"},
          flexDirection: { xs: "column", sm: "row" },
           gap: { xs: 3, sm: 0 },
          pt: 2,
        }}
      >
        <Header 
          title={t('dashboard.title')} 
          subtitle={t('dashboard.subtitle')} 
        />
        {/* Power Meter Dropdown */}
        <Select
          value={selectedPowerMeter || ""}
          onChange={(e) => setSelectedPowerMeter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
          disabled={isPowerMetersLoading}
        >
          <MenuItem value="" disabled>
            {t('dashboard.selectPowerMeter')}
          </MenuItem>
          {powerMeters.map((meter, index) => (
            <MenuItem key={index} value={meter.powermeter_id}>
              {meter.powermeter_alias || meter.powermeter_id}
            </MenuItem>
          ))}
        </Select>
        <NavButtons setActivePage={setActivePage} />
      </Box>
      {/* Render Active Page */}
      <Box sx={{ marginTop: "20px", textAlign: "center", minHeight: "100%" }}>{renderPage()}</Box>
    </Box>
  );
};

export default Dashboard;