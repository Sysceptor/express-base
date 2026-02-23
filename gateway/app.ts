import express, { type Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export class GatewayApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupProxy();
  }

  private setupProxy() {
    this.app.use(
      "/auth",
      createProxyMiddleware({
        target: "http://localhost:4001",
        changeOrigin: true,
      })
    );

    this.app.use(
      "/tasks",
      createProxyMiddleware({
        target: "http://localhost:4002",
        changeOrigin: true,
      })
    );
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Gateway running on ${port}`);
    });
  }
}
