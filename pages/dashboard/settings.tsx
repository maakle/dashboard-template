import { Box, useColorModeValue } from '@chakra-ui/react';
import { unstable_getServerSession } from 'next-auth';
import OrganizationSettings from '../../components/organization/OrganizationSettings';
import { getLayout } from '../../layouts/dashboard';
import prisma from '../../lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]';

const OrganizationSettingsPage = () => {
  return (
    <Box bg={useColorModeValue('gray.50', 'inherit')} p={10} borderRadius="lg">
      <OrganizationSettings />
    </Box>
  );
};

OrganizationSettingsPage.getLayout = getLayout;

export default OrganizationSettingsPage;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // TODO: Currently getting the first organization by default
  const membership = session.user.memberships[0];
  const org = await prisma.organization.findUnique({
    where: { id: membership.organizationId }
  });
  const organization = JSON.parse(JSON.stringify(org));

  return {
    props: {
      organization
    }
  };
}
