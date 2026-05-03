-- CreateTable
CREATE TABLE "Admin" (
    "id_admin" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "nomor_telepon" VARCHAR(20),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_event" SERIAL NOT NULL,
    "nama_event" VARCHAR(100) NOT NULL,
    "deskripsi_event" TEXT,
    "harga_event" INTEGER NOT NULL DEFAULT 0,
    "kuota" INTEGER NOT NULL DEFAULT 0,
    "jadwal_event" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "Keranjang" (
    "id_keranjang" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_event" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Keranjang_pkey" PRIMARY KEY ("id_keranjang")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "id_transaksi" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "total_harga" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Belum Dibayar',

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id_transaksi")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Keranjang" ADD CONSTRAINT "Keranjang_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keranjang" ADD CONSTRAINT "Keranjang_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
