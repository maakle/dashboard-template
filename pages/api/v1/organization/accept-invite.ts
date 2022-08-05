import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { acceptInviteToOrganization } from '../../../../services/OrganizationService';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  switch (req.method) {
    case 'POST': {
      return acceptInviteToOrganization(req, res);
    }
  }
}
