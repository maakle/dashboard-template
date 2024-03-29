import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { inviteUserToOrganization } from '../../../../services/OrganizationService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case 'POST': {
      return inviteUserToOrganization(req, res);
    }

    default:
      return res.status(501).end();
  }
}
