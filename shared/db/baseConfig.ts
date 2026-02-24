import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";

export abstract class OrmBaseConfig extends DataSource {
  constructor(dbUrlEnv: string, label: string, metaUrl: string) {
    const dbUrl = process.env[dbUrlEnv];
    if (!dbUrl) throw new Error(`${dbUrlEnv} is not defined`);

    const __filename = fileURLToPath(metaUrl);
    const __dirname = path.dirname(__filename);
    const serviceName = label.toLowerCase(); // "Auth" → "auth"

    super({
      type: "postgres",
      url: dbUrl,
      name: label,
      synchronize: false,
      logging: process.env.NODE_ENV !== "production",
      migrationsRun: false,
      entities: [
        path.join(
          __dirname,
          `../apps/${serviceName}/db/entities/**/*{.ts,.js}`
        ),
      ],
      migrations: [
        path.join(
          __dirname,
          `../apps/${serviceName}/db/migrations/**/*{.ts,.js}`
        ),
      ],
      subscribers: [],
    });
  }
}
