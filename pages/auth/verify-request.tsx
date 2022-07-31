import { Box, Text } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function CheckRequest() {
  return (
    <Box
      display="flex"
      marginTop={10}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Player
          autoplay
          speed={0.8}
          loop={true}
          src={require('/public/animations/check-inbox.json')}
          style={{ height: '200px', width: '200px' }}
        />
        <Text textAlign="center" marginTop={4}>
          Click on the magic link we sent to your email to sign
        </Text>
      </Box>
    </Box>
  );
}
