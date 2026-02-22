import "reflect-metadata"
import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { OrmBaseConfig } from "../../../../shared/db/baseConfig E.ts";
import { Task } from "../entity/Task.ts";

export class TaskDataSourceManager {
  private static dataSource: DataSource;

  public static getInstance(): DataSource {
    if (!this.dataSource) {
      this.dataSource = new DataSource({
        ...OrmBaseConfig.getBaseConfig(),
        // url: "",
        entities: [Task],
        subscribers: [],
      } satisfies DataSourceOptions);
    }
    return this.dataSource;
  }

  public static async initialize(): Promise<DataSource> {
    const ds = this.getInstance();

    if (!ds.isInitialized) {
      await ds.initialize();
      console.log("Task DB connected");
    }

    return ds;
  }
}
