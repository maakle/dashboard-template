import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { existingUserToOrganization } from '../../../../services/OrganizationService';
// This endpoint is for existing users to join an organization

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
      return existingUserToOrganization(req, res);
    }
  }
}
