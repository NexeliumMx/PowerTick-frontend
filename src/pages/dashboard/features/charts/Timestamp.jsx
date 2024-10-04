import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { useFetch } from '../../../../hooks/useFetch';
import { useContext } from 'react';
import { ModeContext } from '../../../../context/AppModeContext'; 
import { fetchFromMockData } from '../../../../services/api/fetchMockData'; 
import { fetchFromDevApi } from '../../../../services/api/devApi'; 
import { fetchFromCloudApi } from '../../../../services/api/cloudApi'; 

const Timestamp = () => {
  // Get mode from context
  const { state } = useContext(ModeContext);

  // Determine the fetch function based on the selected mode
  let fetchFunction;
  switch (state.mode) {
    case 'DEMO_MODE':
      fetchFunction = fetchFromMockData;
      break;
    case 'DEV_MODE':
      fetchFunction = fetchFromDevApi;
      break;
    case 'LIVE_MODE':
      fetchFunction = fetchFromCloudApi;
      break;
    default:
      fetchFunction = fetchFromMockData; // Default to demo mode
  }

  // Use the useFetch hook with the appropriate fetch function
  const { isFetching, fetchedData, error } = useFetch(fetchFunction, null);

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Timestamp" />

      <CardContent>
        {/* Loading state */}
        {isFetching && <Loading />}

        {/* Error state */}
        {error && <Error />}

        {/* Display fetched data */}
        {!isFetching && !error && fetchedData && (
          <Typography variant="h4" textAlign="center">
            {fetchedData}
          </Typography>
        )}

        {/* Fallback for empty data */}
        {!isFetching && !error && !fetchedData && (
          <Typography variant="h6" textAlign="center">
            No data available
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Timestamp;