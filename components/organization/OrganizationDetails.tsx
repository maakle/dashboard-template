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

export interface IOrganizationDetails {
  organization: OrganzationQueryType;
}

const OrganizationDetails: React.FC<IOrganizationDetails> = ({
  organization,
}) => {
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
      slug: values.slug,
    });
  };

  return (
    <Box>
      <chakra.form
        shadow="base"
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.organizationName}>
          <Heading as="h5" size="sm" my={2}>
            Name
          </Heading>
          <Input
            type="text"
            placeholder="Organization Name"
            autoComplete="organization"
            shadow="sm"
            size="sm"
            maxWidth={250}
            w="full"
            rounded="md"
            marginBottom={4}
            defaultValue={organization.name}
            {...register('organizationName', {
              required: 'Please enter an organization name',
              minLength: {
                value: 3,
                message: 'Organization name is too short',
              },
              maxLength: {
                value: 50,
                message: 'Organization name is too long',
              },
            })}
          />
          <FormErrorMessage>
            {!!errors.organizationName && !!errors.organizationName.message}
          </FormErrorMessage>

          <Heading as="h5" size="sm" my={2}>
            Slug
          </Heading>
          <Input
            type="text"
            placeholder="Slug"
            shadow="sm"
            size="sm"
            maxWidth={250}
            w="full"
            rounded="md"
            defaultValue={organization.slug}
            {...register('slug', {
              required: 'Please enter a unique slug',
              minLength: {
                value: 3,
                message: 'Slug is too short',
              },
              maxLength: {
                value: 20,
                message: 'Slug is too long',
              },
            })}
          />
          <FormErrorMessage>
            {!!errors.slug && !!errors.slug.message}
          </FormErrorMessage>

          <Box pt={5} textAlign="right">
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
    </Box>
  );
};

export default OrganizationDetails;
