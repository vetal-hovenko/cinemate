import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
} from "typeorm/browser";
import { MOVIE_ENTITY_TABLE } from "../../utils/constants";

export class Init1714308148544 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await queryRunner.hasTable(MOVIE_ENTITY_TABLE))) {
            await queryRunner.createTable(
                new Table({
                    name: "movie_entity",
                    columns: [
                        new TableColumn({
                            name: "id",
                            type: "integer",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment",
                        }),
                        new TableColumn({
                            name: "title",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "isWatched",
                            type: "boolean",
                            isNullable: true,
                        }),
                        new TableColumn({
                            name: "dateWatched",
                            type: "text",
                            isNullable: true,
                        }),
                        new TableColumn({
                            name: "dateAdded",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "poster",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "plot",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "imdbRating",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "imdbID",
                            type: "text",
                        }),
                        new TableColumn({
                            name: "genre",
                            type: "text",
                        }),
                    ],
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        if (await queryRunner.hasTable(MOVIE_ENTITY_TABLE)) {
            await queryRunner.dropTable(MOVIE_ENTITY_TABLE);
        }
    }
}
