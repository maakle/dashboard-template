import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LogoMark, LogoOnDark } from '../../icons';
import SidebarContainer from './Container';
import PageLinks from './PageLinks';

export default function Sidebar(props) {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <SidebarContainer bg={bgColor}>
      <NextLink href="/" passHref>
        <a>
          <Flex w="full" align="center" h={16} p={3}>
            <Flex boxSize="full" align="center" px={3}>
              <Flex boxSize="full" align="center">
                <Box
                  as={LogoMark}
                  h={8}
                  w="auto"
                  display={{ base: 'block', lg: 'none' }}
                />

                <Box
                  as={LogoOnDark}
                  h={8}
                  w="auto"
                  display={{ base: 'none', lg: 'block' }}
                />
              </Flex>
            </Flex>
          </Flex>
        </a>
      </NextLink>
      <VStack
        as="nav"
        aria-label="Main navigation"
        position="relative"
        h="calc(100vh - 4rem)"
        p={3}
        overflowY="auto"
        {...props}
      >
        <PageLinks />
      </VStack>
    </SidebarContainer>
  );
}
