import { MigrationInterface, QueryRunner } from "typeorm";
import { MOVIE_ENTITY_TABLE } from "../../utils/constants";

export class AddUserRating1718284448935 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE '${MOVIE_ENTITY_TABLE}' ADD COLUMN 'userRating' TEXT`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
