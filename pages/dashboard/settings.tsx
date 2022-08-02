import OrganizationSettings from '../../components/organization/OrganizationSettings';
import { getLayout } from '../../layouts/dashboard';

const SettingsPage = () => {
  return <OrganizationSettings />;
};

SettingsPage.getLayout = getLayout;

export default SettingsPage;
