import AuthDataSource from "../../../../data-sources/authDataSource.ts";
import { AuthSessionEntity } from "../../db/entities/AuthSession.entity.ts";

export class AuthSessionRepository {
  private repo = AuthDataSource.getRepository(AuthSessionEntity);

  async createSession(
    data: Partial<AuthSessionEntity>
  ): Promise<AuthSessionEntity> {
    const session = this.repo.create(data);
    return this.repo.save(session);
  }

  async findByRefreshToken(token: string): Promise<AuthSessionEntity | null> {
    return this.repo.findOne({ where: { refreshToken: token } });
  }

  async deleteSession(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
