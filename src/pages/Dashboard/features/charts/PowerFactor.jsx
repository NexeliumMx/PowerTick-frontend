import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const PowerFactor = () => {
  const powerFactorValue = 0.75;

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}> {/* Ensure full size of its parent container */}
      <CardHeader
        title="Power Factor"
      />
      
      <CardContent>
        {/* Gauge component for Power Factor */}
        <div style={{ height: 150, width: '100%' }}> {/* Define a height for the container */}
          <Gauge
            value={powerFactorValue * 100} // Gauge expects a value out of 100
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24, // Adjust the font size if necessary
                transform: 'translate(0px, 0px)',
              },
            }}
            text={({ value, valueMax }) => `${(value / 100).toFixed(2)} / 1`} // Format to show as "0.75 / 1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerFactor;