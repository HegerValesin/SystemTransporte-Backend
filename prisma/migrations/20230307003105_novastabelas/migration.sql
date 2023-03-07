-- CreateTable
CREATE TABLE `setor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `setor_setor_key`(`setor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bancos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nunbanco` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `financeira` BOOLEAN NOT NULL DEFAULT false,
    `admcartao` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formapg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,
    `endereco` VARCHAR(60) NULL,
    `bairro` VARCHAR(25) NULL,
    `complemento` VARCHAR(50) NULL,
    `cidede` VARCHAR(30) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `ibge` INTEGER NOT NULL,
    `telefone` VARCHAR(15) NULL,
    `celular` VARCHAR(15) NULL,
    `responsavel` VARCHAR(50) NULL,
    `ie` VARCHAR(20) NULL,
    `cnpj` VARCHAR(18) NULL,
    `im` VARCHAR(18) NULL,
    `email` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
