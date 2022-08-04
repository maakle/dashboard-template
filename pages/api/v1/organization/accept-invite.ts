import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from '../../../../lib/prisma';
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
      const { inviteToken } = req.body;

      try {
        const orgInvite = await prisma.organizationInvite.findUnique({
          where: {
            token: inviteToken
          }
        });

        if (orgInvite && orgInvite.expiresAt > new Date()) {
          await prisma.organizationInvite.update({
            where: { id: orgInvite.id },
            data: {
              accepted: true
            }
          });
          return res.status(200).json({
            success: true,
            message: 'Invite accepted'
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Couldn't find invite or it's expired"
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: 'Something went wrong'
        });
      }
    }
  }
}
