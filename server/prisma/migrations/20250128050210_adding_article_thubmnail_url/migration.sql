/*
  Warnings:

  - Added the required column `thumbnailUrl` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
