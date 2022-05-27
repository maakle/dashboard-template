import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import OrganizationSettings from './OrganizationSettings';

const ProfileContainer = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10} borderRadius="lg">
      <OrganizationSettings />
    </Box>
  );
};

export default ProfileContainer;
