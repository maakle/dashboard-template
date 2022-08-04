import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from '../../../../lib/prisma';
import { sendOrganizationInvite } from '../../../../services/EmailService';

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
      try {
        const organizationId: string = req.body.organizationId;
        const email: string = req.body.email;

        const user = await prisma.user.findUnique({
          where: {
            email
          },
          include: { memberships: true }
        });

        if (user) {
          // User exists already in organization
          if (
            user.memberships.some((m) => m.organizationId === organizationId)
          ) {
            return res.status(200).json({
              message: "You can't add a user who has already joined."
            });
          }

          // User does not exist in organizastion and needs to be added
          console.log('User found, add to project');
          await prisma.membership.create({
            data: { organizationId, userId: user.id }
          });

          return res
            .status(200)
            .json({ message: 'User added to organization' });
        } else {
          // User needs an invite to create account and join
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7); // Invite expires after 7 days
          const token = nanoid();

          await prisma.organizationInvite.create({
            data: {
              email,
              organizationId,
              expiresAt,
              token
            }
          });

          sendOrganizationInvite(email, token);
          return res.status(200).json({ message: 'Email sent' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          error: 'Error occurred while retrieving your organization.'
        });
      }
    }
  }
}
