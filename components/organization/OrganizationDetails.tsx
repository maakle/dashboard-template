import {
  Box,
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { OrganzationQueryType } from '../../hooks/useOrganization';
import { sendPatchRequest } from '../../lib/sendPatchRequest';

export default function OrganizationDetails({
  organization,
}: {
  organization: OrganzationQueryType;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { trigger } = useSWRMutation('/api/v1/organization', sendPatchRequest);

  const onSubmit = async (values: any) => {
    trigger({
      organizationId: organization.id,
      name: values.organizationName,
    });
  };

  return (
    <chakra.form
      shadow="base"
      rounded={[null, 'md']}
      overflow={{ sm: 'hidden' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.organizationName}>
        <Heading as="h5" size="sm" mb={2}>
          Organization Name
        </Heading>

        <Input
          type="text"
          placeholder="Organization Name"
          autoComplete="organization"
          mt={1}
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          maxWidth={400}
          defaultValue={organization.name}
          {...register('organizationName', {
            required: 'Please enter an organization name',
            minLength: { value: 3, message: 'Organization name is too short' },
            maxLength: { value: 50, message: 'Organization name is too long' },
          })}
        />
        <FormErrorMessage>
          {!!errors.organizationName && !!errors.organizationName.message}
        </FormErrorMessage>

        <Box px={{ base: 4, sm: 6 }} pt={5} textAlign="right">
          <Button
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
            type="submit"
          >
            Save Changes
          </Button>
        </Box>
      </FormControl>
    </chakra.form>
  );
}
