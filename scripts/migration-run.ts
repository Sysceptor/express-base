import { execSync } from "child_process";
import fs from "fs";
import chalk from "chalk";

const args = process.argv.slice(2);
const service = args[0];

if (!service) {
  console.log(
    chalk.red(
      "Usage: npm run mig:run <service>\nExample: npm run mig:run users"
    )
  );
  process.exit(1);
}

const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
const dataSourcePath = `data-sources/${serviceName}DataSource.ts`;

if (!fs.existsSync(dataSourcePath)) {
  console.log(chalk.red(`DataSource not found for service: ${service}`));
  process.exit(1);
}

const command = `npx tsx --env-file=.env ./node_modules/typeorm/cli.js migration:run -d ${dataSourcePath}`;

console.log(chalk.cyan(`Running migrations for "${service}"...`));
console.log(chalk.gray(command));
execSync(command, { stdio: "inherit" });
console.log(chalk.green("Migrations executed successfully!"));
