import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Organization } from '@prisma/client';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request'
  },
  callbacks: {
    async session({ session, user }) {
      const userObject = await prisma.user.findFirst({
        where: { id: user.id },
        include: {
          memberships: {
            include: {
              organization: true
            }
          }
        }
      });
      session.user = userObject;
      return session;
    }
  },
  events: {
    createUser: async (message) => {
      // Creates a default organization & membership for the user upon signup
      const organization: Organization = await prisma.organization.create({
        data: { name: 'Default Organization' }
      });
      await prisma.membership.create({
        data: {
          userId: message.user.id,
          organizationId: organization.id,
          role: 'OWNER'
        }
      });
    }
  }
});
