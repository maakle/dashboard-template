import { VStack } from '@chakra-ui/react';
import {
  Calendar,
  ChartSquareBar,
  Folder,
  Home,
  Inbox,
  UserGroup
} from '../../icons';
import SidebarLink from './SidebarLink';

const PageLinks = () => {
  return (
    <VStack w="full" spacing={1}>
      <SidebarLink href="/dashboard" icon={Home}>
        Dashboard
      </SidebarLink>
      <SidebarLink href="/dashboard/team" icon={UserGroup}>
        Team
      </SidebarLink>
      <SidebarLink href="/dashboard/projects" icon={Folder}>
        Projects
      </SidebarLink>
      <SidebarLink href="/dashboard/calendar" icon={Calendar}>
        Calendar
      </SidebarLink>
      <SidebarLink href="/dashboard/documents" icon={Inbox}>
        Documents
      </SidebarLink>
      <SidebarLink href="/dashboard/reports" icon={ChartSquareBar}>
        Reports
      </SidebarLink>
    </VStack>
  );
};

export default PageLinks;
