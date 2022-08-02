import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (messageObject) => {
  sgMail
    .send(messageObject)
    .then(() => console.log('Email Sent'))
    .catch((error) => console.log(error));
};

export const sendOrganizationInvite = (email: string) => {
  const msg = {
    to: email,
    from: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_NAME
    },
    templateId: 'd-2f01c426fda24f36854279d7199c6cfd',
    dynamicTemplateData: {
      link: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/signin`
    }
  };

  sendEmail(msg);
};
