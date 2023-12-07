import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1701869427053 implements MigrationInterface {
    name = 'Initial1701869427053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fio\` varchar(255) NOT NULL, \`apiToken\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_a62473490b3e4578fd683235c5\` (\`login\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`weather\` (\`id\` int NOT NULL AUTO_INCREMENT, \`actionTime\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`requestResult\` int NOT NULL, \`tempC\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`weather\` ADD CONSTRAINT \`FK_acea852b347b35bfc85bca1a67e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`weather\` DROP FOREIGN KEY \`FK_acea852b347b35bfc85bca1a67e\``);
        await queryRunner.query(`DROP TABLE \`weather\``);
        await queryRunner.query(`DROP INDEX \`IDX_a62473490b3e4578fd683235c5\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
