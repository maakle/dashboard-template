import { Box, Flex, Text } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingError: React.FC = () => {
  return (
    <Flex height="100%">
      <Box margin="auto">
        <Player
          autoplay
          speed={0.8}
          loop={true}
          src={require('/public/animations/error.json')}
          style={{ height: '80px', width: '80px' }}
        />
        <Text textAlign="center" marginTop={5}>
          Something went wrong.
        </Text>
      </Box>
    </Flex>
  );
};

export default LoadingError;
