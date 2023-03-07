/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[placa]` on the table `veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `clientes` MODIFY `fone` VARCHAR(30) NULL,
    MODIFY `cep` VARCHAR(9) NULL,
    MODIFY `endereco` VARCHAR(255) NULL,
    MODIFY `numero` INTEGER NULL,
    MODIFY `complemento` VARCHAR(50) NULL,
    MODIFY `CPFCNPJ` VARCHAR(18) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `cpf` VARCHAR(14) NULL DEFAULT '111.111.111-11';

-- CreateIndex
CREATE UNIQUE INDEX `user_login_key` ON `user`(`login`);

-- CreateIndex
CREATE UNIQUE INDEX `veiculos_placa_key` ON `veiculos`(`placa`);
