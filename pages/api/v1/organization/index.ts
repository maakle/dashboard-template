import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import NextCors from 'nextjs-cors';
import {
  editOrganization,
  getOrganization
} from '../../../../services/OrganizationService';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'PATCH'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  switch (req.method) {
    case 'GET': {
      const session = await unstable_getServerSession(req, res, authOptions);
      return getOrganization(req, res, session);
    }

    case 'PATCH': {
      return editOrganization(req, res);
    }
  }
}
