import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (
  messageObject: sgMail.MailDataRequired | sgMail.MailDataRequired[]
): Promise<void> => {
  try {
    await sgMail.send(messageObject);
  } catch (error) {
    return error;
  }
};

export const sendOrganizationInviteEmail = async (
  email: string,
  inviteToken: string,
  newUser: boolean
): Promise<void> => {
  let link = '';

  if (newUser) {
    link = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/accept-invite?inviteToken=${inviteToken}`;
  } else {
    link = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/join-organization?inviteToken=${inviteToken}`;
  }

  const msg = {
    to: email,
    from: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_NAME,
    },
    templateId: 'd-2f01c426fda24f36854279d7199c6cfd',
    dynamicTemplateData: {
      link: link,
    },
  };
  try {
    await sendEmail(msg);
  } catch (error) {
    console.log(error);
  }
};
