-- CreateTable
CREATE TABLE "ResetPasswordSecret" (
    "id" TEXT NOT NULL,
    "secret" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResetPasswordSecret_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordSecret_userId_key" ON "ResetPasswordSecret"("userId");

-- AddForeignKey
ALTER TABLE "ResetPasswordSecret" ADD CONSTRAINT "ResetPasswordSecret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
