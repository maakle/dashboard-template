import { Organization, OrganizationInvite } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from 'next-auth';
import prisma from '../lib/prisma';
import { sendOrganizationInviteEmail } from './EmailService';

export const createDefaultOrganizationForUser = async (
  user: User
): Promise<void> => {
  try {
    const organization: Organization = await prisma.organization.create({
      data: { name: 'Default Organization' },
    });
    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: 'OWNER',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  try {
    // TODO: Implement feature for active organization. Now just pick the top
    const membership = session.user.memberships[0];
    const organization = await prisma.organization.findUnique({
      where: { id: membership.organizationId },
      include: { memberships: { include: { user: true } } },
    });

    return res.status(200).json(organization);
  } catch (error) {
    return res.status(500).json({
      error: 'Error occurred while retrieving your organization.',
    });
  }
};

export const editOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { organizationId, name } = req.body;
    const newOrganization = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        name: name,
      },
    });
    return res.status(200).json(newOrganization);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error occurred while updating your organization.' });
  }
};

export const inviteUserToOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const organizationId: string = req.body.organizationId;
    const email: string = req.body.email;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: { memberships: true },
    });

    if (user) {
      // Check if user is already in organization
      const userExistsInOrg = user.memberships.some(
        (m) => m.organizationId === organizationId
      );
      if (userExistsInOrg) {
        return res.status(200).json({
          message: "You can't add an user who has already joined.",
        });
      } else {
        // User has account, send existing user invite to join
        await createOrganizationInvite(email, organizationId, false);
        return res.status(200).json({ message: 'User invite sent.' });
      }
    } else {
      // User doesn't have an account, hence send new user invitiation email
      await createOrganizationInvite(email, organizationId, true);
      return res.status(200).json({ message: 'New user invite sent.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error occurred while retrieving your organization.',
    });
  }
};

const createOrganizationInvite = async (
  email: string,
  organizationId: string,
  newUser: boolean
): Promise<void> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Invite expires after 7 days
  const token = nanoid();

  try {
    await prisma.organizationInvite.create({
      data: {
        email,
        organizationId,
        expiresAt,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
  sendOrganizationInviteEmail(email, token, newUser);
};

export const newUserToOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { inviteToken } = req.body;
  try {
    const validInvite = await acceptValidInvite(inviteToken);

    if (validInvite) {
      return res.status(200).json({
        success: true,
        message: 'Invite accepted',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Couldn't find invite or invite is expired",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const existingUserToOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { inviteToken } = req.body;

  try {
    const validInvite = await acceptValidInvite(inviteToken);
    const user = await prisma.user.findUnique({
      where: { email: validInvite.email },
    });
    await createOrganizationMembership(validInvite.organizationId, user.id);
    return res.status(200).json({
      success: true,
      message: 'Membership created',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const acceptValidInvite = async (
  inviteToken: string
): Promise<OrganizationInvite> => {
  try {
    const orgInvite = await prisma.organizationInvite.findUnique({
      where: {
        token: inviteToken,
      },
    });
    // Check if organization invite can be found and it's valid
    if (orgInvite && orgInvite.expiresAt > new Date()) {
      await prisma.organizationInvite.update({
        where: { id: orgInvite.id },
        data: {
          accepted: true,
        },
      });
      return orgInvite;
    } else {
      // Organization invite is not valid
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const createOrganizationMembership = async (
  organizationId: string,
  userId: string
): Promise<void> => {
  try {
    await prisma.membership.create({
      data: { organizationId, userId },
    });
  } catch (error) {
    console.log(error);
  }
};
