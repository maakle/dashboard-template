/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OrganizationInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrganizationInvite_token_key" ON "OrganizationInvite"("token");
