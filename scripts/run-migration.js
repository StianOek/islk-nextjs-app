const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const client = await pool.connect();
    
    console.log("Running analytics migration...");
    
    const migrationPath = path.join(
      __dirname,
      "../src/migrations/003_analytics.sql"
    );
    const sql = fs.readFileSync(migrationPath, "utf8");
    
    await client.query(sql);
    
    console.log("✅ Analytics migration completed successfully!");
    
    client.release();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
