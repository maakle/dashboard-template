This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To install all dependencies, run:

```bash
npm install
# or
yarn
```

### Config

You need to set all environment variables before the next step. They can be found in the files `env.example and `.env.exmaple.local`. Due tu prisma we need to set the prisma variables in a separate file and also include a shadow db to run some migrations.

This template is using Sendgrid for sending out emails. Hence it is required to have a sendgrid account and verified sender identity.

If you want to use Oauth. Also add Github and Google Oauth credendtials. Lastly set the Next Auth secret and domain.

### Run

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
