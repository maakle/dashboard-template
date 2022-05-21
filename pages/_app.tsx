import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { SessionProvider, useSession, signIn } from 'next-auth/react';
import React from 'react';
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
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <>{getLayout(<Component {...pageProps} />)}</>
        )}
      </SessionProvider>
    </ChakraProvider>
  );
};

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  React.useEffect(() => {
    if (status === 'loading') return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}

export default App;
