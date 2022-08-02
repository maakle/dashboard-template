import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import prisma from '../../../lib/prisma';
import { sendOrganizationInvite } from '../../../services/EmailService';

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
        const { organizationId, email } = req.body;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (user) {
          // Add to project
          res.status(200).json({ message: 'User added to organization' });
        } else {
          // Send invite to new user
          // TODO add to invite table
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 7); // Invite expires after 7 days


          sendOrganizationInvite(email);
          res.status(200).json({ message: 'Email sent' });
        }
      } catch (error) {
        res.status(500).json({
          error: 'Error occurred while retrieving your organization.'
        });
      }
    }
  }
}
