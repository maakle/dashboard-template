import { Flex, useColorModeValue } from '@chakra-ui/react';
import Header from './Header';

export interface IPage {
  children: any;
}

const Page: React.FC<IPage> = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const primarytextColor = useColorModeValue('black', 'white');

  return (
    <>
      <Header />

      <Flex
        as="main"
        w="full"
        justify="center"
        direction="column"
        px={[4, 6, null, 8]}
        mt={16}
        h="calc(100vh - 4rem)"
        bg={bgColor}
        color={primarytextColor}
      >
        <Flex
          direction="column"
          w="full"
          h="full"
          justify="center"
          align="center"
          pt={[8, 10, null, 12]}
        >
          <Flex direction="column" w="full" h="full" maxW="5xl">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
