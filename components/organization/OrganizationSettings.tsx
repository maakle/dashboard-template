import {
  Box,
  Button,
  chakra,
  Divider,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import TeamMemberTable from './TeamMemberTable';

const OrganizationSettings = () => {
  const session = useSession();
  console.log('session ', session);

  useEffect(() => {}, []);

  return (
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
              You can manage your organization's information & team member here.
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
              <chakra.form
                method="POST"
                shadow="base"
                rounded={[null, 'md']}
                overflow={{ sm: 'hidden' }}
              >
                <Heading as="h5" size="sm" mb={2}>
                  Organization Name
                </Heading>

                <Input
                  type="text"
                  name="company_name"
                  id="company_name"
                  autoComplete="company"
                  mt={1}
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  maxWidth={400}
                />

                <Box px={{ base: 4, sm: 6 }} pt={5} textAlign="right">
                  <Button
                    backgroundColor="gray.900"
                    color="white"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.700' }}
                    _active={{
                      bg: 'gray.800',
                      transform: 'scale(0.95)'
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </chakra.form>

              <Divider marginY={10} />

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
                >
                  Add Member
                </Button>
              </SimpleGrid>

              <TeamMemberTable />
            </Box>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default OrganizationSettings;
