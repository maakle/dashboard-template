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
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  signIn
} from 'next-auth/react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
interface SignInProps {
  csrfToken: string;
  providers: ClientSafeProvider[];
}

export default function SignIn(props: SignInProps) {
  const getProviderIcon = (providerName: string): JSX.Element => {
    console.log(providerName);
    
    if (providerName === 'github') {
      return <BsGithub />;
    } else {
      return <BsGoogle />;
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
          <Stack spacing={4}>
            {props.providers &&
              Object.values(props.providers).map((provider) => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <Center>
                    <Button
                      leftIcon={getProviderIcon(provider.id)}
                      colorScheme="cool-gray"
                      variant="solid"
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </Button>
                  </Center>
                </div>
              ))}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken
    }
  };
}
