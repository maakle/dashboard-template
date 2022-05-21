import { Button, Center, Flex, useColorModeValue } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { MY_APP } from '../../utils/constants';
import ThemeToggle from '../theme-toggle';
import MobileNav from './mobile-nav';

export default function Header() {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={[0, 0, 64]}
      right={0}
      align="center"
      h={16}
      px={[4, 6, 8]}
      bg={bgColor}
      zIndex="docked"
    >
      <Flex w="full" align="center" justify="center">
        <Flex w="full" align="center" justify="space-between">
          <Flex align="center">
            <NextLink href="/dashboard" passHref>
              <Button as="a" variant="ghost" px={0} fontWeight="bold">
                {MY_APP}
              </Button>
            </NextLink>
          </Flex>
          <Flex>
            <ThemeToggle mr={`-${3}`} />
            <Center>
              <Button
                colorScheme="blue"
                marginLeft={10}
                size="sm"
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`
                  })
                }
              >
                Signout
              </Button>
            </Center>

            <MobileNav />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
