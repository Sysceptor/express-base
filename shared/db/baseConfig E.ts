import { DataSourceOptions } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";

import "reflect-metadata";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class OrmBaseConfig {
    public static getBaseConfig() {
        
        return {
            type: 'postgres',
            synchronize: false,
            logging: true,
            // 🔥 auto-load entitie
            // entities: ["services/**/entities/**/*{.ts,.js}"],
            // migrations: [".././migrations/**/*{.ts,.js}"],
            // ✅ robust absolute paths
    //   entities: [path.join(__dirname, "../../services/**/entities/**/*{.ts,.js}")],
    //   migrations: [path.join(__dirname, "../../migrations/**/*{.ts,.js}")],
            migrationsRun: false

        } as const satisfies Partial<DataSourceOptions>;
    }
}




