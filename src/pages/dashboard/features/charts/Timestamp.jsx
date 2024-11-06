import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { useData } from '../../../../context/DataProvider';

const Timestamp = React.memo(() => {
  const { realTimeData, isFetching, error } = useData();

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Timestamp" />

      <CardContent>
        {isFetching && <Loading />}
        {error && <Error />}
        {!isFetching && !error && realTimeData && realTimeData.timestamp ? (
          <Typography variant="h4" textAlign="center">
            {realTimeData.timestamp}
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
});

export default Timestamp;
