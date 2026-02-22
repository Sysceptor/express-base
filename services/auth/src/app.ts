
import express, { Application } from "express";
// import { AuthDataSourceManager } from "./db/auth-data-source.ts";
import { AuthDataSourceManager } from "../../../data-sources/taskDataSource.ts";

export class AuthApp {
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
      res.json({ service: "auth", status: "ok" });
    });
  }

  public async start(port: number) {
    await AuthDataSourceManager.initialize();
    console.log("Auth DB connected");

    this.app.listen(port, () => {
      console.log(`Auth service running on ${port}`);
    });
  }
}
