import { Organization } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export function useOrganization(): {
  data: Organization;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR('/api/organization', fetcher);

  return {
    data: data as Organization,
    isLoading: !error && !data,
    isError: error
  };
}
