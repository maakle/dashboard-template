import axios from 'axios';

export async function inviteTeammember(url: string, args: any): Promise<void> {
  return axios.post(url, args.arg);
}
