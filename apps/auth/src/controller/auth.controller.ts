// import { Request, Response } from "express";
// import { AbstractUserService } from "../service/abstract/auth.service.ts";
// import { BaseController } from "../../../../shared/controller/base.controller.ts";

// export class AuthController extends BaseController{
//   constructor(private authService: AbstractUserService) {
//     super();
//   }

//   register = async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;

//       const user = await this.authService.register(email, password);

//       res.status(201).json({
//         success: true,
//         data: user,
//       });
//     } catch (error: any) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

//   login = async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;

//       const result = await this.authService.login(email, password);

//       res.status(200).json({
//         success: true,
//         data: result,
//       });
//     } catch (error: any) {
//       res.status(401).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// }
