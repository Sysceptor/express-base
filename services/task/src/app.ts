import express, { type Application } from "express";
import { TaskDataSourceManager} from "./db/task-data-source.ts";

export class TaskApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.get("/health", (_req, res) => {
      res.json({ service: "Task", status: "ok" });
    });
  }

  public async start(port: number) {
    await TaskDataSourceManager.initialize();
    console.log("Task DB connected");

    this.app.listen(port, () => {
      console.log(`Task service running on ${port}`);
    });
  }
}
