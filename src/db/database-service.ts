import { DataSource } from "typeorm/browser";
import { Init1714308148544 } from "./migrations/1714308148544-init";
import { MovieEntity } from "./entities/movie.entity";
import * as SQLite from "expo-sqlite/legacy";
import { AddUserRating1718284448935 } from "./migrations/1718284448935-AddUserRating";

export class DatabaseService {
    private static instance: DataSource;

    public static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DataSource({
                database: "main",
                driver: SQLite,
                entities: [MovieEntity],
                synchronize: false,
                type: "expo",
                migrationsRun: true,
                migrations: [Init1714308148544, AddUserRating1718284448935],
            });
        }

        return DatabaseService.instance;
    }

    public static getManager() {
        return this.getInstance().manager;
    }
}
