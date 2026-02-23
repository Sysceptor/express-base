// import { AuthRepository } from "../repositories/auth.repository.ts";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'

// export class AuthService {
//   private authRepository: AuthRepository;

//   constructor() {
//     this.authRepository = new AuthRepository();
//   }

//   async register(email: string, password: string) {
//     const existing = await this.authRepository.findByEmail(email);
//     if (existing) {
//       throw new Error("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.authRepository.create({ email, password: hashedPassword });

//     return { id: user.id, email: user.email };
//   }

//   async login(email: string, password: string) {
//     const user = await this.authRepository.findByEmail(email);
//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error("Invalid credentials");
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "7d" }
//     );

//     return { token };
//   }
// }

//<<<<------------------- Need to fix ----------->