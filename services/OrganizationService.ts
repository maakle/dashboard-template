import { Organization } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from 'next-auth';
import prisma from '../lib/prisma';
import { sendOrganizationInvite } from './EmailService';

export const createDefaultOrganizationForUser = async (
  user: User
): Promise<void> => {
  try {
    const organization: Organization = await prisma.organization.create({
      data: { name: 'Default Organization' }
    });
    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: 'OWNER'
      }
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
      include: { memberships: { include: { user: true } } }
    });

    return res.status(200).json(organization);
  } catch (error) {
    return res.status(500).json({
      error: 'Error occurred while retrieving your organization.'
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
        name: name
      }
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
        email
      },
      include: { memberships: true }
    });

    if (user) {
      // Check if user is already in organization
      const userExistsInOrg = user.memberships.some(
        (m) => m.organizationId === organizationId
      );
      if (userExistsInOrg) {
        return res.status(200).json({
          message: "You can't add a user who has already joined."
        });
      } else {
        // User does not exist in organizastion and can be added
        // TODO, maybe send first invite and only after acceptance add
        await prisma.membership.create({
          data: { organizationId, userId: user.id }
        });

        return res.status(200).json({ message: 'User added to organization' });
      }
    } else {
      // User has no account, and can be invited
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
};

export const acceptInviteToOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { inviteToken } = req.body;

  try {
    const orgInvite = await prisma.organizationInvite.findUnique({
      where: {
        token: inviteToken
      }
    });

    if (orgInvite && orgInvite.expiresAt > new Date()) {
      await prisma.organizationInvite.update({
        where: { id: orgInvite.id },
        data: {
          accepted: true
        }
      });
      return res.status(200).json({
        success: true,
        message: 'Invite accepted'
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Couldn't find invite or it's expired"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};
