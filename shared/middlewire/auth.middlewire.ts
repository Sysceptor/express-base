import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export class AuthenticationMiddleware {
  static verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    try {
      const header = req.headers.authorization;

      if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = header.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      (req as any).currentUser = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
}
