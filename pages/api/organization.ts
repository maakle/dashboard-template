import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import NextCors from 'nextjs-cors';
import prisma from '../../lib/prisma';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200
  });

  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions);
    const membership = session.user.memberships[0];
    const organization = await prisma.organization.findUnique({
      where: { id: membership.organizationId }
    });

    return res.status(200).json({ organization });
  }
}
