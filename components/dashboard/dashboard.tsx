import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Header from './header';
import Sidebar from './sidebar';

export default function Dashboard({ children }) {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Header />
      <Sidebar display={['none', null, 'flex']} w={64} />

      <Flex as="main" ml={[0, 0, 64]} bg={bgColor}>
        <Flex direction="column" w="full">
          <Box
            w="full"
            as="section"
            px={[4, 6, 8]}
            py={4}
            mt={16}
            h="calc(100vh - 4rem)"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
