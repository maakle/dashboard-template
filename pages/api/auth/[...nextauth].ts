import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
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
    signIn: '/auth/signin'
  },
  callbacks: {
    async signIn({ account, profile }) {
      // Restrict access to only people from this domain
      if (account.provider === 'google') {
        return (
          profile.email_verified && profile.email.endsWith('@passbase.com')
        );
      }
      return true;
    }
  }
});
