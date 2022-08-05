import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import {
  editOrganization,
  getOrganization
} from '../../../../services/OrganizationService';

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
      getOrganization(req, res);
    }

    case 'PATCH': {
      editOrganization(req, res);
    }
  }
}
