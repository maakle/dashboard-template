import { Button, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Organization } from '@prisma/client';
import React from 'react';
import BlurryOverlay from '../common/BlurryOverlay';
import InviteTeamMemberModal from '../modals/InviteTeamMemberModal';
import TeamMemberTable from './TeamMemberTable';

export default function TeamSection({
  organization
}: {
  organization: Organization;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<BlurryOverlay />);

  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        <Heading as="h5" size="sm" mb={2}>
          Team
        </Heading>

        <Button
          justifySelf="end"
          size="sm"
          backgroundColor="gray.900"
          color="white"
          fontWeight="medium"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
          onClick={() => {
            setOverlay(<BlurryOverlay />);
            onOpen();
          }}
        >
          Add Member
        </Button>

        <InviteTeamMemberModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          overlay={overlay}
        />
      </SimpleGrid>

      <TeamMemberTable />
    </>
  );
}