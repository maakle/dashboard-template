import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import NotificationSettings from './NotificationSettings';
import PersonalSettings from './PersonalSettings';

const ProfileSettings: React.FC = () => {
  const bg = useColorModeValue('gray.50', 'inherit');

  return (
    <Box bg={bg} p={10} borderRadius="lg">
      <PersonalSettings />

      <Box marginTop={10} marginBottom={10}>
        <Divider />
      </Box>

      <NotificationSettings />
    </Box>
  );
};

export default ProfileSettings;
