import { Box, Flex, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './sidebar';

export interface IDashboard {
  children: any;
}

const Dashboard: React.FC<IDashboard> = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <Header />
      {!isSmallScreen && <Sidebar display={['none', null, 'flex']} w={64} />}

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
};

export default Dashboard;
