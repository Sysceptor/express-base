// import { DataSourceOptions, DataSource } from "typeorm";
// import path from "path";
// import { fileURLToPath } from "url";
// import "reflect-metadata";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export abstract class OrmBaseConfig {

//   private dataSource?: DataSource;
//   protected constructor(
//     private readonly dbUrlEnv: string,
//     private readonly label: string
//   ) {}
//   public getInstance(): DataSource {
//     const dbUrl = process.env[this.dbUrlEnv];
//     if (!dbUrl) {throw new Error(`${this.dbUrlEnv} is not defined`);}
//     if (!this.dataSource) {
//       const options: DataSourceOptions = {
//         type: "postgres",
//         url: dbUrl,
//         synchronize: false,
//         logging: process.env.NODE_ENV !== "production",
//         migrationsRun: false,
//         // auto-load entitie
//         entities: [path.join(__dirname, "../../entities/**/*{.ts,.js}")],
//         migrations: [path.join(__dirname, "../../migrations/**/*{.ts,.js}")],
//         subscribers: [],
//       };
//       this.dataSource = new DataSource(options);
//     }
//     return this.dataSource;
//   }

//   public async initialize(): Promise<DataSource> {
//     const ds = this.getInstance();

//     if (!ds.isInitialized) {
//       await ds.initialize();
//       console.log(`${this.label} DB connected`);
//     }
//     return ds;
//   }
// }


import { DataSourceOptions, DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";
import "reflect-metadata";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export abstract class OrmBaseConfig extends DataSource {
//   constructor(dbUrlEnv: string, label: string) {
//     const dbUrl = process.env[dbUrlEnv];
//     if (!dbUrl) throw new Error(`${dbUrlEnv} is not defined`);
//       const serviceName = label.toLowerCase(); 

//     const options: DataSourceOptions = {
//       type: "postgres",
//       url: dbUrl,
//       name: label,
//       synchronize: false,
//       logging: process.env.NODE_ENV !== "production",
//       migrationsRun: false,
//       entities: [path.join(__dirname, "entities/**/*{.ts,.js}")],
//       migrations: [path.join(__dirname, "migrations/**/*{.ts,.js}")],
//       subscribers: [],
//     };

//     super(options);
//   }
// }


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
      entities: [path.join(__dirname, `../services/${serviceName}/entities/**/*{.ts,.js}`)],
      migrations: [path.join(__dirname, `../services/${serviceName}/migrations/**/*{.ts,.js}`)],
      subscribers: [],
    });
  }
}