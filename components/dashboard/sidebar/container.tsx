import { Box } from '@chakra-ui/react';

function SidebarContainer(props) {
  return (
    <Box
      as="aside"
      position="fixed"
      top={0}
      w={64}
      insetX={0}
      h="full"
      {...props}
    />
  );
}

export default SidebarContainer;
