import { useSession } from 'next-auth/react';
import { getLayout } from '../layouts/dashboard';

const DashboardIndex = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>Dashboard Content</div>;
};

DashboardIndex.getLayout = getLayout;

export default DashboardIndex;
