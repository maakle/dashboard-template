import { Box, Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

const MobileSignOut: React.FC = () => {
  return (
    <Box paddingBottom={4} alignSelf="flex-start" width="100%">
      <Button
        fontSize="sm"
        leftIcon={<FaSignOutAlt />}
        width="inherit" 
        onClick={() => {
          signOut({ callbackUrl: `${window.location.origin}` });
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default MobileSignOut;
