import { Box, Flex, Spinner } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Flex height="100%">
      <Box margin="auto">
        <Spinner />
      </Box>
    </Flex>
  );
};

export default LoadingSpinner;
