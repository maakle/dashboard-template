import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

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
      console.log('body ', req.body);

      const { organizationId, email } = req.body;

      console.log(email + ' invited to ' + organizationId);
    }
  }
}
