/*
  Warnings:

  - You are about to drop the column `reset_password_token` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "reset_password_token",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
