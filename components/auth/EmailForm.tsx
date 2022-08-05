import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const EmailForm = ({ setLoading }) => {
  const textColor = useColorModeValue('gray.800', 'gray.400');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signIn('email', {
        email,
        callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '2xl', md: '3xl' }}
          marginBottom={2}
        >
          Sign in with Magic Link
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={textColor}
          marginBottom={4}
        >
          Enter your email below
        </Text>

        <FormControl id="email" onSubmit={handleSubmit}>
          <Input
            placeholder="your@email.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </FormControl>
        <Stack marginTop={4} spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
          >
            Request Magic Link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default EmailForm;
