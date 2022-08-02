import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import NextCors from 'nextjs-cors';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

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
      try {
        const session = await unstable_getServerSession(req, res, authOptions);
        // TODO: Implement feature for active organization. Now just pick the top
        const membership = session.user.memberships[0];
        const organization = await prisma.organization.findUnique({
          where: { id: membership.organizationId },
          include: { memberships: { include: { user: true } } }
        });

        res.status(200).json(organization);
      } catch (error) {
        res.status(500).json({
          error: 'Error occurred while retrieving your organization.'
        });
      }
      break;
    }

    case 'PATCH': {
      try {
        const { organizationId, name } = req.body;
        const newOrganization = await prisma.organization.update({
          where: { id: organizationId },
          data: {
            name: name
          }
        });
        res.status(200).json(newOrganization);
      } catch (error) {
        res
          .status(500)
          .json({ error: 'Error occurred while updating your organization.' });
      }
      break;
    }
  }
}
