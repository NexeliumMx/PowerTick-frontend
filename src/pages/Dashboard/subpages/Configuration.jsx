import { Box, Card, CardHeader, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Configuration = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Grid Container */}
      <Grid container spacing={3}>
        {/* ID */}
        <Grid size={6}>
          <Card>
            <CardHeader title="ID" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                12345
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Client */}
        <Grid size={6}>
          <Card>
            <CardHeader title="Client" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                ABC Corporation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Location */}
        <Grid size={4}>
          <Card>
            <CardHeader title="Location" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                New York, NY
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Load Center */}
        <Grid size={4}>
          <Card>
            <CardHeader title="Load Center" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Main Load Center 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Model */}
        <Grid size={4}>
          <Card>
            <CardHeader title="Model" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Model X123
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Manufacturer */}
        <Grid size={3}>
          <Card>
            <CardHeader title="Manufacturer" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                ACME Corp.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Firmware Version */}
        <Grid size={3}>
          <Card>
            <CardHeader title="Firmware Version" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                v1.2.3
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Serial Number */}
        <Grid size={3}>
          <Card>
            <CardHeader title="Serial Number" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                SN123456789
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Registration Date */}
        <Grid size={3}>
          <Card>
            <CardHeader title="Registration Date" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                2024-09-15
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Configuration;
