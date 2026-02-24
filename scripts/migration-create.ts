import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const service = args[0];
let migrationName = args[1];

if (!service) {
  console.log(
    chalk.red(
      "Usage: npm run mig:create <service>\nExample: npm run mig:create auth"
    )
  );
  process.exit(1);
}

if (!migrationName) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  migrationName = `${service}Create${timestamp}`;
}

const migrationsDir = path.resolve(`apps/${service}/db/migrations`);

if (!fs.existsSync(migrationsDir)) {
  console.log(chalk.yellow("📁 Creating migrations folder..."));
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const fullPath = `${migrationsDir}/${migrationName}`;
const command = `npx typeorm migration:create ${fullPath}`;

console.log(chalk.cyan(`Creating migration: ${migrationName}`));
console.log(chalk.gray(command));
execSync(command, { stdio: "inherit" });
console.log(chalk.green("✅ Migration created successfully!"));
