import { OrmBaseConfig } from "../shared/db/baseConfig.ts";

class AuthDataSource extends OrmBaseConfig {
  constructor() {
    super("DB_URL_AUTH", "Auth",import.meta.url);
  }
}

export default new AuthDataSource();