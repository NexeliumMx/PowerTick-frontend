// src/pages/dashboard/features/charts/Timestamp.jsx

import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { useData } from '../../../../context/DataProvider';

const Timestamp = () => {
  const { realTimeData, isFetching, error } = useData();

  console.log('Real-time Data in Timestamp Component:', realTimeData); // Debugging log to inspect realTimeData

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Timestamp" />

      <CardContent>
        {/* Loading state */}
        {isFetching && <Loading />}

        {/* Error state */}
        {error && <Error />}

        {/* Display the timestamp if available */}
        {!isFetching && !error && realTimeData && realTimeData.timestamp ? (
          <Typography variant="h4" textAlign="center">
            {realTimeData.timestamp} {/* Display the timestamp */}
          </Typography>
        ) : (
          !isFetching && !error && !realTimeData && (
            <Typography variant="h6" textAlign="center">
              No data available
            </Typography>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default Timestamp;
