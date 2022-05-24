import { VStack } from '@chakra-ui/react';
import { Folder, Home, UserGroup } from '../../icons';
import SidebarLink from './SidebarLink';

const PageLinks = () => {
  return (
    <VStack w="full" spacing={1}>
      <SidebarLink href="/dashboard" icon={Home}>
        Dashboard
      </SidebarLink>

      <SidebarLink href="/dashboard/projects" icon={Folder}>
        Projects
      </SidebarLink>

      <SidebarLink href="/dashboard/team" icon={UserGroup}>
        Team
      </SidebarLink>
    </VStack>
  );
};

export default PageLinks;
