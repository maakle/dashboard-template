import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { newUserToOrganization } from '../../../../services/OrganizationService';

// This endpoint is for new users to accept an invite to join the company and create a new account.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case 'POST': {
      return newUserToOrganization(req, res);
    }
    default:
      return res.status(501).end();
  }
}
