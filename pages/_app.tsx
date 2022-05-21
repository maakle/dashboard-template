import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import AuthGuard from '../components/auth/AuthGuard';
import theme from '../components/design-system';
import Nprogress from '../components/nprogress';
import DefaultLayout from '../layouts/default';

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout children={page} />);

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <CSSReset />
        <Nprogress />

        {Component.auth ? (
          <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
        ) : (
          <>{getLayout(<Component {...pageProps} />)}</>
        )}
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
