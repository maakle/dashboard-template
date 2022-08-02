import axios from 'axios';

export async function inviteTeammember(url: string, args: any) {
  axios.post(url, args.arg);
}
