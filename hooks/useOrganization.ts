import { Membership, Organization, User } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export type OrganzationQueryType = Organization & {
  memberships: (Membership & {
    user: User;
  })[];
};

export function useOrganization(): {
  data: OrganzationQueryType;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR('/api/organization', fetcher);

  return {
    data: data as OrganzationQueryType,
    isLoading: !error && !data,
    isError: error
  };
}
