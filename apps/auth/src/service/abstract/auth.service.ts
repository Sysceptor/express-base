export abstract class AbstractUserService {
  abstract register(email: string, password: string): Promise<void>;
  //   abstract login(email:string,password:string):Promise<void>;
}
