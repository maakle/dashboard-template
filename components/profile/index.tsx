import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NotificationSettings from './NotificationSettings';
import PersonalSettings from './PersonalSettings';

const ProfileSettings = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10} borderRadius="lg">
      <PersonalSettings />

      <Box marginTop={10} marginBottom={10}>
        <Divider />
      </Box>

      <NotificationSettings />
    </Box>
  );
};

export default ProfileSettings;
