-- CreateEnum
CREATE TYPE "ProviderEnum" AS ENUM ('GOOGLE', 'APPLE', 'STRAVA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "profilePictureUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OauthAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "provider" "ProviderEnum" NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "OauthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baggables" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "drop" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Baggables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaggableTypes" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "BaggableTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bags" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "baggablesId" INTEGER NOT NULL,
    "baggedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Bags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BaggableTypesToBaggables" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OauthAccount_providerUserId_provider_key" ON "OauthAccount"("providerUserId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "BaggableTypes_type_key" ON "BaggableTypes"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_BaggableTypesToBaggables_AB_unique" ON "_BaggableTypesToBaggables"("A", "B");

-- CreateIndex
CREATE INDEX "_BaggableTypesToBaggables_B_index" ON "_BaggableTypesToBaggables"("B");

-- AddForeignKey
ALTER TABLE "OauthAccount" ADD CONSTRAINT "OauthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bags" ADD CONSTRAINT "Bags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bags" ADD CONSTRAINT "Bags_baggablesId_fkey" FOREIGN KEY ("baggablesId") REFERENCES "Baggables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BaggableTypesToBaggables" ADD CONSTRAINT "_BaggableTypesToBaggables_A_fkey" FOREIGN KEY ("A") REFERENCES "BaggableTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BaggableTypesToBaggables" ADD CONSTRAINT "_BaggableTypesToBaggables_B_fkey" FOREIGN KEY ("B") REFERENCES "Baggables"("id") ON DELETE CASCADE ON UPDATE CASCADE;
