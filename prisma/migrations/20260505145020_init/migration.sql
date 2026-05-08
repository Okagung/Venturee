-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_event" SERIAL NOT NULL,
    "nama_event" TEXT NOT NULL,
    "deskripsi_event" TEXT,
    "harga_event" INTEGER NOT NULL DEFAULT 0,
    "kuota" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "Keranjang" (
    "id_keranjang" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Keranjang_pkey" PRIMARY KEY ("id_keranjang")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Belum Dibayar',

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Keranjang" ADD CONSTRAINT "Keranjang_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keranjang" ADD CONSTRAINT "Keranjang_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
