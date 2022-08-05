import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { OrganzationQueryType } from '../../hooks/useOrganization';
import { capitalizeFirstLetter } from '../../utils/helper';

const TeamMemberTable = ({
  organization
}: {
  organization: OrganzationQueryType;
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!!organization &&
            organization.memberships.map((member) => (
              <Tr key={member.id}>
                <Td>{member.user.name}</Td>
                <Td>{capitalizeFirstLetter(member.role)}</Td>
                <Td>
                  <Button colorScheme="red" size="xs">
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TeamMemberTable;
