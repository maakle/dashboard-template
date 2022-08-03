import {
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const NotificationSettings = () => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const stackBg = useColorModeValue('white', 'gray.700');
  const boxColor = useColorModeValue('gray.900', 'gray.50');
  const boxColor2 = useColorModeValue('gray.50', 'gray.900');
  const chakraLabelColor = useColorModeValue('gray.700', 'gray.50');
  const testColor2 = useColorModeValue('gray.500', 'gray.400');
  const radioGroupColor = useColorModeValue('gray.700', 'gray.50');

  return (
    <Box mt={[10, 0]}>
      <SimpleGrid
        display={{ base: 'initial', md: 'grid' }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridItem colSpan={{ md: 1 }} marginBottom={6}>
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              Notifications
            </Heading>
            <Text mt={1} fontSize="sm" color={textColor}>
              Decide which communications you'd like to receive and how.
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
            <Stack px={4} py={5} p={[null, 6]} bg={stackBg} spacing={6}>
              <chakra.fieldset>
                <Box as="legend" fontSize="md" color={boxColor}>
                  By Email
                </Box>
                <Stack mt={4} spacing={4}>
                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox
                        colorScheme="brand"
                        id="comments"
                        rounded="md"
                      />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="comments"
                        fontWeight="md"
                        color={chakraLabelColor}
                      >
                        Comments
                      </chakra.label>
                      <Text color={testColor2}>
                        Get notified when someones posts a comment on a posting.
                      </Text>
                    </Box>
                  </Flex>

                  <Flex alignItems="start">
                    <Flex alignItems="center" h={5}>
                      <Checkbox colorScheme="brand" id="offers" rounded="md" />
                    </Flex>
                    <Box ml={3} fontSize="sm">
                      <chakra.label
                        htmlFor="offers"
                        fontWeight="md"
                        color={chakraLabelColor}
                      >
                        Offers
                      </chakra.label>
                      <Text color={testColor2}>
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </Text>
                    </Box>
                  </Flex>
                </Stack>
              </chakra.fieldset>
              <chakra.fieldset>
                <Box as="legend" fontSize="md" color={boxColor}>
                  Push Notifications
                  <Text fontSize="sm" color={testColor2}>
                    These are delivered via SMS to your mobile phone.
                  </Text>
                </Box>
                <RadioGroup
                  fontSize="sm"
                  color={radioGroupColor}
                  colorScheme="brand"
                  mt={4}
                  defaultValue="1"
                >
                  <Stack spacing={4}>
                    <Radio spacing={3} value="1">
                      Everything
                    </Radio>
                    <Radio spacing={3} value="2">
                      Same as email
                    </Radio>
                    <Radio spacing={3} value="3">
                      No push notifications
                    </Radio>
                  </Stack>
                </RadioGroup>
              </chakra.fieldset>
            </Stack>
            <Box
              px={{ base: 4, sm: 6 }}
              py={3}
              bg={boxColor2}
              textAlign="right"
            >
              <Button
                type="submit"
                colorScheme="brand"
                _focus={{ shadow: '' }}
                fontWeight="md"
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

export default NotificationSettings;
