import { MigrationInterface, QueryRunner } from "typeorm";

export class Scan1607253234548 implements MigrationInterface {
  name = "Scan1607253234548";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `scan` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `birthday` date NOT NULL, `nik` varchar(255) NOT NULL, `scannedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `scan`");
  }
}
