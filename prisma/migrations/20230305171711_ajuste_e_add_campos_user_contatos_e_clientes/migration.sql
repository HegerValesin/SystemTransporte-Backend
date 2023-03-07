/*
  Warnings:

  - You are about to drop the column `cliente_id` on the `contatos` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `contatos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `CPFCNPJ` VARCHAR(18) NOT NULL DEFAULT '111.111.111-11',
    ADD COLUMN `tipo` ENUM('F', 'J') NOT NULL DEFAULT 'F';

-- AlterTable
ALTER TABLE `contatos` DROP COLUMN `cliente_id`,
    ADD COLUMN `clienteId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `cpf` VARCHAR(14) NOT NULL DEFAULT '111.111.111-11',
    ADD COLUMN `login` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `contatos` ADD CONSTRAINT `contatos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
