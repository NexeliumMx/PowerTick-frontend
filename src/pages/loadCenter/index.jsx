import { Box, Typography, Card, CardContent, CardActions, Button, Grid2,Accordion,AccordionSummary,AccordionDetails,Skeleton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/ui/Header";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { fetchPowermetersByUserAccess } from "../../services/api/httpRequests";




const LoadCenter = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
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
                setTimeout(() => {
                  setShowSkeleton(false);
                }, 1000);

              })
              .catch((error) => {
                console.error("Error fetching powermeters:", error);
                setShowSkeleton(false);
              });
          } else {
            console.error("Object ID not found in token claims.");
            setShowSkeleton(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching token claims:", error);
          setShowSkeleton(false);
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
        <Grid2 container spacing={2}>
          {(showSkeleton || !powermetersData
            ? Array.from({ length: 4 }) // Skeletons
            : powermetersData // Datos reales
          ).map((item, index) => (
            <Grid2
              key={
                showSkeleton || !powermetersData
                  ? `skeleton-${index}`
                  : item.serial_number
              }
              size={{ xs: 12, lg: 6 }}
            >
              {showSkeleton || !powermetersData ? (
                <Card sx={{ minWidth: 275, padding: 1 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Skeleton animation="wave" variant="text" width="40%" height={30} />
                    <Skeleton animation="wave" variant="circular" width={24} height={24} />
                  </Box>
                  <Skeleton animation="wave" variant="rectangular" height={120} sx={{ mb: 2 }} />
  
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Skeleton animation="wave" variant="text" width="50%" height={30} />
                    <Skeleton animation="wave" variant="circular" width={24} height={24} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton
                        key={`skeleton-line-${index}-${i}`}
                        animation="wave"
                        variant="text"
                        width="80%"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={140}
                    height={36}
                    sx={{ mx: 1 }}
                  />
                </Card>
              ) : (
                <Card sx={{ minWidth: 275, padding: 1 }}>
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
  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Meter Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" display="block">
                        Serial Number: {item.serial_number}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Client ID: {item.client_id}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Client Alias: {item.client_alias}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Installation ID: {item.installation_id}
                      </Typography>
                      <Typography variant="body2" display="block">
                        Installation Alias: {item.installation_alias}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
  
                  <CardActions>
                    <Button variant="contained" size="small">Go to dashboard</Button>
                  </CardActions>
                </Card>
              )}
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
  
};

export default LoadCenter;