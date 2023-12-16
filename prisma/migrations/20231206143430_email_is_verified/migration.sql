/*
  Warnings:

  - You are about to drop the column `emailIsVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `emailIsVerified`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL;
