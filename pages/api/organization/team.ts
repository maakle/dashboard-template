import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
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

        // TODO: Create Email invite in template

        sendOrganizationInvite(email);
        res.status(200).json({ message: 'Email sent' });
      } catch (error) {
        res.status(500).json({
          error: 'Error occurred while retrieving your organization.'
        });
      }
    }
  }
}
