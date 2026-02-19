/*
  Warnings:

  - You are about to alter the column `revenue` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `spend` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `profit` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `roas` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,4)`.
  - You are about to alter the column `roi` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,4)`.
  - You are about to alter the column `cpa` on the `FactKpiDaily` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,4)`.

*/
-- AlterTable
ALTER TABLE "FactKpiDaily" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "revenue" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "spend" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "profit" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "roas" SET DATA TYPE DECIMAL(18,4),
ALTER COLUMN "roi" SET DATA TYPE DECIMAL(18,4),
ALTER COLUMN "cpa" SET DATA TYPE DECIMAL(18,4);
