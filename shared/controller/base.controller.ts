import { Response } from "express";

export abstract class BaseController {
  protected ok(res: Response, data?: unknown): void {
    res.status(200).json(data);
  }

  protected created(res: Response, data?: unknown): void {
    res.status(201).json(data);
  }

  protected noContent(res: Response): void {
    res.status(204).send();
  }

  protected badRequest(res: Response, message: string): void {
    res.status(400).json({ message });
  }

  protected unauthorized(res: Response, message: string): void {
    res.status(401).json({ message });
  }

  protected forbidden(res: Response, message: string): void {
    res.status(403).json({ message });
  }

  protected notFound(res: Response, message: string): void {
    res.status(404).json({ message });
  }

  protected conflict(res: Response, message: string): void {
    res.status(409).json({ message });
  }

  protected serverError(res: Response, message: string): void {
    res.status(500).json({ message });
  }
}
