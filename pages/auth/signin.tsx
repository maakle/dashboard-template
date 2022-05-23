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
import { CtxOrReq } from 'next-auth/client/_utils';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import EmailForm from '../../components/auth/EmailForm';
interface SignInProps {
  providers: ClientSafeProvider[];
}

export default function SignIn(props: SignInProps) {
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
          <Stack spacing={4}>
            <EmailForm />

            <Center>
              <Text>or</Text>
            </Center>

            <Button
              leftIcon={<BsGithub />}
              colorScheme="cool-gray"
              variant="solid"
              onClick={() =>
                signIn('github', {
                  callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`
                })
              }
            >
              Sign in with Github
            </Button>

            <Button
              leftIcon={<BsGoogle />}
              colorScheme="cool-gray"
              variant="solid"
              onClick={() =>
                signIn('google', {
                  callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`
                })
              }
            >
              Sign in with Google
            </Button>
          </Stack>
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
