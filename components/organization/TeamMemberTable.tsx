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
import { useTeam } from '../../hooks/useTeam';
import { capitalizeFirstLetter } from '../../utils/helper';
import LoadingError from '../common/LoadingError';
import LoadingSpinner from '../common/LoadingSpinner';

const TeamMemberTable = () => {
  const { data, isLoading, isError } = useTeam();

  if (isError) return <LoadingError />;
  if (isLoading) return <LoadingSpinner />;

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
          {data.map((member) => (
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
