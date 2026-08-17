-- AlterTable
-- Additive, non-destructive: adds a single boolean column with a safe
-- default. No existing column, enum value, or row value is changed.
ALTER TABLE "Post" ADD COLUMN "editorialApproved" BOOLEAN NOT NULL DEFAULT false;
