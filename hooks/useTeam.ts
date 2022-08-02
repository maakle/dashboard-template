import { Membership, User } from '@prisma/client';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

export function useTeam(): {
  data: (Membership & {
    user: User;
  })[];
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR('/api/organization/team', fetcher);

  console.log('received ', data);

  return {
    data: data as (Membership & {
      user: User;
    })[],
    isLoading: !error && !data,
    isError: error
  };
}
