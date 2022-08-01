import LoadingError from '../../components/common/LoadingError';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import OrganizationSettings from '../../components/organization/OrganizationSettings';
import { useOrganization } from '../../hooks/useOrganization';
import { getLayout } from '../../layouts/dashboard';

const OrganizationSettingsPage = () => {
  const { data, isLoading, isError } = useOrganization();
  if (isError) return <LoadingError />;
  if (isLoading) return <LoadingSpinner />;

  return <OrganizationSettings organization={data} />;
};

OrganizationSettingsPage.getLayout = getLayout;

export default OrganizationSettingsPage;
