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
import { Organization } from '@prisma/client';
import OrganizationDetails from './OrganizationDetails';
import TeamSection from './TeamSection';

const OrganizationSettings = ({
  organization
}: {
  organization: Organization;
}) => {
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10} borderRadius="lg">
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
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                You can manage your organization's information & team member
                here.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg={useColorModeValue('white', 'gray.700')}
              spacing={6}
            >
              <Box>
                <OrganizationDetails organization={organization} />

                <Divider marginY={10} />

                <TeamSection organization={organization} />
              </Box>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default OrganizationSettings;
