import { Button, Center, Flex, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MY_APP } from '../utils/constants';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <Flex
      pos="fixed"
      as="header"
      align="center"
      justify="center"
      top={0}
      insetX={0}
      h={16}
      px={[4, 6, null, 8]}
      bg={bgColor}
      borderBottomWidth="1px"
    >
      <Flex w="full" align="center" justify="center">
        <Flex w="full" maxW="5xl" align="center" justify="center">
          <Flex w="full" align="center" justify="space-between">
            <Flex align="center">
              <NextLink href="/" passHref>
                <Button as="a" variant="ghost" px={0} fontWeight="bold">
                  {MY_APP}
                </Button>
              </NextLink>
            </Flex>
            <Flex>
              <ThemeToggle />

              <Center>
                <Button
                  as="a"
                  href="/auth/signin"
                  backgroundColor="gray.900"
                  color="white"
                  fontWeight="medium"
                  ml={4}
                  maxW="200px"
                  _hover={{ bg: 'gray.700' }}
                  _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                  }}
                >
                  Sign In
                </Button>
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
