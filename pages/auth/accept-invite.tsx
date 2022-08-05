import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { sendPostRequest } from '../../lib/sendPostRequest';

export default function AcceptInvite() {
  const { trigger } = useSWRMutation(
    '/api/v1/organization/accept-invite',
    sendPostRequest
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const inviteToken = router.query.inviteToken as string;

  const handleAcceptInvite = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    if (inviteToken) {
      try {
        await trigger({
          inviteToken
        });
        router.push('/auth/signin');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErrorMessage(error.response.data.message);
      }
    } else {
      setLoading(false);
      setErrorMessage('No invite token provided');
    }
  }, [inviteToken, router, trigger]);

  useEffect(() => {
    handleAcceptInvite();
  }, [handleAcceptInvite, inviteToken]);

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        {loading ? (
          <Box>
            <Player
              autoplay
              speed={1.2}
              loop={true}
              src={require('/public/animations/processing.json')}
              style={{ height: '120px', width: '120px' }}
            />
            <Text textAlign="center" marginTop={0}>
              Forwarding to signup...
            </Text>
          </Box>
        ) : (
          <Box>
            <Player
              autoplay
              speed={0.8}
              loop={true}
              src={require('/public/animations/error.json')}
              style={{ height: '60px', width: '60px' }}
            />
            <Text textAlign="center" marginTop={5}>
              {errorMessage}
            </Text>
          </Box>
        )}
      </Stack>
    </Flex>
  );
}
