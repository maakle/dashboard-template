import {
  Box,
  Divider,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useOrganization } from '../../hooks/useOrganization';
import LoadingError from '../common/LoadingError';
import LoadingSpinner from '../common/LoadingSpinner';
import OrganizationDetails from './OrganizationDetails';
import TeamSection from './TeamSection';

const OrganizationSettings = () => {
  const bg = useColorModeValue('gray.50', 'inherit');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const stackBg = useColorModeValue('white', 'gray.700');
  const { data, isLoading, isError } = useOrganization();
  if (isError) return <LoadingError />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <Box bg={bg} p={10} borderRadius="lg">
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 1 }}
          spacing={{ md: 6 }}
        >
          <GridItem marginBottom={6}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Organization Information
              </Heading>
              <Text mt={1} fontSize="sm" color={textColor}>
                You can manage your organization's information & team member
                here.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Stack px={4} py={5} p={[null, 6]} bg={stackBg} spacing={6}>
              <Box>
                <OrganizationDetails organization={data} />

                <Divider marginY={10} />

                <TeamSection organization={data} />
              </Box>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default OrganizationSettings;
