-- CreateTable
CREATE TABLE "Tab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tab" TEXT NOT NULL,
    "taburl" TEXT NOT NULL,
    "artist" TEXT,
    "contributors" TEXT[],
    "capo" INTEGER NOT NULL,
    "tuning" TEXT NOT NULL,

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tab_taburl_key" ON "Tab"("taburl");
