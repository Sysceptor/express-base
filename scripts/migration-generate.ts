import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const args = process.argv.slice(2);

// required
const service = args[0];

// optional
let migrationName = args[1];

if (!service) {
  console.log(
    chalk.red(
      "❌ Usage: npm run mig:gen <service> [MigrationName]\nExample: npm run mig:gen users CreateUsersTable"
    )
  );
  process.exit(1);
}

// ✅ default name if missing
if (!migrationName) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  migrationName = `${service}Auto${timestamp}`;
}

// paths
const migrationsDir = path.resolve(
  `services/${service}/migrations`
);
const dataSourcePath = `data-sources/${service}DataSource.ts`;

// validate datasource exists
if (!fs.existsSync(dataSourcePath)) {
  console.log(
    chalk.red(`❌ DataSource not found for service: ${service}`)
  );
  process.exit(1);
}

// ensure migrations folder exists
if (!fs.existsSync(migrationsDir)) {
  console.log(chalk.yellow("📁 Creating migrations folder..."));
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const fullPath = `${migrationsDir}/${migrationName}`;

const command = `npx tsx  --env-file=.env ./node_modules/typeorm/cli.js migration:generate ${fullPath} -d ${dataSourcePath}`;

console.log(
  chalk.cyan(`🚀 Generating migration: ${migrationName}`)
);
console.log(chalk.gray(command));

execSync(command, { stdio: "inherit" });

console.log(chalk.green("✅ Migration generated successfully!"));