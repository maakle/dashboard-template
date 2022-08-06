-- DropIndex
DROP INDEX "Organization_slug_key";

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "slug" SET DEFAULT '';
