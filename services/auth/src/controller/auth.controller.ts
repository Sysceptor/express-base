// // controllers/auth.controller.ts
// import { Request, Response } from "express";
// import { BaseController } from "../../../../shared/controller/base.controller.ts";
// // import { AuthService } from "../services/auth.service.ts";

// class AuthController extends BaseController {
//   private authService: AuthService;

//   constructor() {
//     super();
//     this.authService = new AuthService();
//   }

//   register = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { email, password } = req.body;
//       const result = await this.authService.register(email, password);
//       this.created(res, result);
//     } catch (e) {
//       this.serverError(res, "Internal server error");
//     }
//   };

//   login = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { email, password } = req.body;
//       const result = await this.authService.login(email, password);
//       this.ok(res, result);
//     } catch (e) {
//       this.serverError(res, "Internal server error");
//     }
//   };
// }

// export default new AuthController();