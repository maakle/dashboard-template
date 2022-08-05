import { Box, Flex, Spinner } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

export interface IAuthGuard {
  children: any;
}

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
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
  return (
    <Flex marginTop="50vh">
      <Box margin="auto">
        <Spinner />
      </Box>
    </Flex>
  );
};

export default AuthGuard;
