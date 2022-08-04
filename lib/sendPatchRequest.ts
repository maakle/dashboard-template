import axios from 'axios';

export async function sendPatchRequest(url: string, args: any): Promise<void> {
  return axios.patch(url, args.arg);
}
