import axios from 'axios';

export async function updateOrganization(url: string, args: any) {
  axios.patch(url, args.arg);
}
