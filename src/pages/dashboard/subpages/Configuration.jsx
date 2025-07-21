import { Box, Card, CardHeader, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Configuration = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        mt: 0,
        mb: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={3}>
          {/* ID */}
          <Grid size={isSmallScreen ? 12 : 6}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="ID"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  12345
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Client */}
          <Grid size={isSmallScreen ? 12 : 6}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Client"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  ABC Corporation
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Location */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Location"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  New York, NY
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Load Center */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Load Center"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Main Load Center 1
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Model */}
          <Grid size={isSmallScreen ? 12 : 4}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Model"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  Model X123
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Manufacturer */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Manufacturer"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  ACME Corp.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Firmware Version */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Firmware Version"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  v1.2.3
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Serial Number */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Serial Number"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  SN123456789
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Registration Date */}
          <Grid size={isSmallScreen ? 12 : 3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.card,
              }}
            >
              <CardHeader
                title="Registration Date"
                titleTypographyProps={{
                  variant: "h3",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  2024-09-15
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Configuration;
