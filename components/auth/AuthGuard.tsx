import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import LoadingSpinner from '../util/LoadingSpinner';

const AuthGuard = ({ children }) => {
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
  return <LoadingSpinner />;
};

export default AuthGuard;
