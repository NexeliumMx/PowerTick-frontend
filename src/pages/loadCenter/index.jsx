import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";
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
          powermetersData.map((powermeter, index) => (
            <Card key={index} sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <Typography variant="p" display="block">Serial Number: {powermeter.serial_number}</Typography>
                <Typography variant="p" display="block">Client ID: {powermeter.client_id}</Typography>
                <Typography variant="p" display="block">Client Alias: {powermeter.client_alias}</Typography>
                <Typography variant="p" display="block">Installation ID: {powermeter.installation_id}</Typography>
                <Typography variant="p" display="block">Installation Alias: {powermeter.installation_alias}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See info</Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadCenter;