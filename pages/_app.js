import React from 'react';
import { ChakraProvider, CSSReset, ThemeProvider } from '@chakra-ui/react';
import Nprogress from '@/components/nprogress';
import theme from '@/components/design-system';
import DefaultLayout from '@/layouts/default';

const App = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout children={page} />);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Nprogress />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
};

export default App;
