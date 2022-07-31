import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { CtxOrReq } from 'next-auth/client/_utils';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import EmailForm from '../../components/auth/EmailForm';

interface SignInProps {
  providers: ClientSafeProvider[];
}

export default function SignIn(props: SignInProps) {
  const [loading, setLoading] = useState(false);

  const handleOauthSignin = async (provider: string) => {
    try {
      setLoading(true);
      await signIn(provider, {
        callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to access all features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          {loading ? (
            <Box>
              <Player
                autoplay
                speed={0.8}
                loop={true}
                src={require('/public/animations/loading-circles.json')}
                style={{ height: '100px', width: '100px' }}
              />
              <Text textAlign="center" marginTop={0}>
                Processing...
              </Text>
            </Box>
          ) : (
            <Stack spacing={4}>
              <EmailForm setLoading={setLoading} />

              <Center>
                <Text>or</Text>
              </Center>

              <Button
                leftIcon={<BsGithub />}
                colorScheme="cool-gray"
                variant="solid"
                onClick={() => handleOauthSignin('github')}
              >
                Sign in with Github
              </Button>

              <Button
                leftIcon={<BsGoogle />}
                colorScheme="cool-gray"
                variant="solid"
                onClick={() => handleOauthSignin('google')}
              >
                Sign in with Google
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}
