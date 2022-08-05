import { getLayout } from '../../layouts/dashboard';

const DashboardIndex = () => {
  return <div>Dashboard Content</div>;
};

DashboardIndex.getLayout = getLayout;
DashboardIndex.auth = true;

export default DashboardIndex;
