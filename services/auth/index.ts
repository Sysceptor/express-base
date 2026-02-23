
import AuthDataSource from "../../data-sources/AuthDataSource.ts";

async function bootstrap(): Promise<void> {
  await AuthDataSource.start(4001);
}

bootstrap();