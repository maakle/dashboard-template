import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const OrganizationSettings = () => {
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
              Use a permanent address where you can receive mail.
            </Text>
          </Box>
        </GridItem>
        <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
          <chakra.form
            method="POST"
            shadow="base"
            rounded={[null, 'md']}
            overflow={{ sm: 'hidden' }}
          >
            <Stack
              px={4}
              py={5}
              p={[null, 6]}
              bg={useColorModeValue('white', 'gray.700')}
              spacing={6}
            >
              <SimpleGrid columns={6} spacing={6}>
                <FormControl as={GridItem} colSpan={4}>
                  <FormLabel
                    htmlFor="first_name"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Company Name
                  </FormLabel>
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
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={6}>
                  <FormLabel
                    htmlFor="street_address"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Street address
                  </FormLabel>
                  <Input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    mt={1}
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
                  <FormLabel
                    htmlFor="city"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    City
                  </FormLabel>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    mt={1}
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    htmlFor="state"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    State / Province
                  </FormLabel>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    autoComplete="state"
                    mt={1}
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
                  <FormLabel
                    htmlFor="postal_code"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    ZIP / Postal
                  </FormLabel>
                  <Input
                    type="text"
                    name="postal_code"
                    id="postal_code"
                    autoComplete="postal-code"
                    mt={1}
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  />
                </FormControl>

                <FormControl as={GridItem} colSpan={3}>
                  <FormLabel
                    htmlFor="country"
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue('gray.700', 'gray.50')}
                  >
                    Country / Region
                  </FormLabel>
                  <Select
                    id="country"
                    name="country"
                    autoComplete="country"
                    placeholder="Select option"
                    mt={1}
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
            </Stack>
            <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
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
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default OrganizationSettings;
