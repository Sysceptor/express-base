import AuthDataSource from "../../../../data-sources/authDataSource.ts";
import { UserEntity } from "../../db/entities/User.entity.ts";

export class UserRepository {
  private repo = AuthDataSource.getRepository(UserEntity);

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
