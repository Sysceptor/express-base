// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { UserRepository } from "../repositories/user.repository.ts";
// import { AuthSessionRepository } from "../repositories/authSession.repository.ts";
// import { AbstractUserService } from "./abstract/auth.service.ts";

// export class AuthService extends AbstractUserService{
//   private userRepo = new UserRepository();
//   private sessionRepo = new AuthSessionRepository();

//   async register(email: string, password: string) {
//     const existing = await this.userRepo.findByEmail(email);
//     if (existing) {
//       throw new Error("User already exists");
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await this.userRepo.create({
//       email,
//       password: passwordHash,
//     });

//     return user;
//   }

//   async login(email: string, password: string) {
//     const user = await this.userRepo.findByEmail(email);
//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid credentials");
//     }

//     const accessToken = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_ACCESS_SECRET!,
//       { expiresIn: "15m" }
//     );

//     const refreshToken = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_REFRESH_SECRET!,
//       { expiresIn: "7d" }
//     );

//     await this.sessionRepo.createSession({
//       user: user.id,
//       refreshToken,
//     });

//     return {
//       accessToken,
//       refreshToken,
//       user,
//     };
//   }
// }
