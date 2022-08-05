import { VStack } from '@chakra-ui/react';
import { Folder, Home, Settings } from '../../icons';
import SidebarLink from './SidebarLink';

const PageLinks: React.FC = () => {
  return (
    <VStack w="full" spacing={1}>
      <SidebarLink href="/dashboard" icon={Home}>
        Dashboard
      </SidebarLink>

      <SidebarLink href="/dashboard/projects" icon={Folder}>
        Projects
      </SidebarLink>

      <SidebarLink href="/dashboard/settings" icon={Settings}>
        Settings
      </SidebarLink>
    </VStack>
  );
};

export default PageLinks;
