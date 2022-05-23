import { Center, Grid, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Grid minH="100%">
      <Center>
        <Spinner />
      </Center>
    </Grid>
  );
};

export default LoadingSpinner;
