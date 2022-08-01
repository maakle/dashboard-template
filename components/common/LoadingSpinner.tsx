import { Box, Flex, Spinner } from '@chakra-ui/react';

export default function LoadingSpinner() {
  return (
    <Flex height="100%">
      <Box margin="auto">
        <Spinner />
      </Box>
    </Flex>
  );
}
