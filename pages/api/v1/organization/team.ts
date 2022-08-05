import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from '../../../../lib/prisma';
import { sendOrganizationInvite } from '../../../../services/EmailService';
import { inviteUserToOrganization } from '../../../../services/OrganizationService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  switch (req.method) {
    case 'POST': {
      inviteUserToOrganization(req, res);
    }
  }
}
