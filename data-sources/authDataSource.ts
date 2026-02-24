import express, { type Application } from "express";

import { OrmBaseConfig } from "../shared/db/baseConfig.ts";

// import authRouter from "../services/auth/src/routes/auth.routes.ts";

class AuthDataSource extends OrmBaseConfig {
  private app: Application;

  constructor() {
    super("DB_URL_AUTH", "Auth", import.meta.url);
    this.app = express();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    // this.app.use("/api/auth", authRouter);
  }

  async start(port: number = 4001): Promise<void> {
    await this.initialize();
    console.log("Auth DB connected");

    this.setupMiddleware();
    this.setupRoutes();

    await new Promise<void>((resolve, reject) => {
      this.app
        .listen(port, () => {
          console.log(`Auth service running on port ${port}`);
          resolve();
        })
        .on("error", reject);
    });
  }
}

export default new AuthDataSource();
