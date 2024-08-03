-- CreateTable
CREATE TABLE "Posts" (
    "pid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Like" (
    "lid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("lid")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Posts"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
