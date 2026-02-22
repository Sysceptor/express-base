import { DataSourceOptions, DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";
import "reflect-metadata";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { OrmBaseConfig } from "../../../../shared/db/baseConfig E.ts";

export class AuthDataSourceManager {
  private static dataSource: DataSource;

  public static getInstance(): DataSource {
    if (!this.dataSource) {
      this.dataSource = new DataSource({
        ...OrmBaseConfig.getBaseConfig(),
        url: "",
        entities: [path.join(__dirname, "../../services/**/entities/**/*{.ts,.js}")],
                migrations: [path.join(__dirname, "../../migrations/**/*{.ts,.js}")],
      } satisfies DataSourceOptions);
    }
    return this.dataSource;
  }
  
  public static async initialize(): Promise<DataSource> {
    const ds = this.getInstance();

    if (!ds.isInitialized) {
      await ds.initialize();
      console.log("Auth DB connected");
    }

    return ds;
  }
}
