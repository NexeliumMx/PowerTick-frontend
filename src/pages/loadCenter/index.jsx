import { Box, Typography, Card, CardContent, CardActions, Button, Grid2,Accordion,AccordionSummary,AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/ui/Header";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { fetchPowermetersByUserAccess } from "../../services/api/httpRequests";

const LoadCenter = () => {
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
                setPowermetersData(data); // Store the fetched JSON data
              })
              .catch((error) => {
                console.error("Error fetching powermeters:", error);
              });
          } else {
            console.error("Object ID not found in token claims.");
          }
        })
        .catch((error) => {
          console.error("Error fetching token claims:", error);
        });
    }
  }, [accounts, instance]);

  return (
    <Box m="20px">
      <Header
        title="LOAD CENTERS"
        subtitle="Overview and Management of Energy Distribution and Consumption"
      />
      <Box>
        {powermetersData ? (
          <Grid2 container spacing={2}>
            {powermetersData.map((powermeter, index) => (
              <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                <Card sx={{ minWidth: 275, padding: 1 }}>
                  {/* Accordion 1: Gráficas */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Visualizations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Aquí irán las gráficas de Consumo y Factor de Potencia (Recharts)
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Accordion 2: Datos del medidor */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Meter Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" display="block">
                        Serial Number: {powermeter.serial_number}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Client ID: {powermeter.client_id}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Client Alias: {powermeter.client_alias}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Installation ID: {powermeter.installation_id}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Installation Alias: {powermeter.installation_alias}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <CardActions>
                    <Button variant="contained"size="small">Go to dashboard</Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadCenter;