import pg from "pg";
const { Client } = pg;

// PostgreSQL connection settings from environment variables
const localDbConfig = {
  connectionString: process.env.LOCAL_DATABASE_URL,
};

const cloudDbConfig = {
  connectionString: process.env.CLOUD_DATABASE_URL,
};

// Query to get table row counts
const rowCountQuery = `
  SELECT table_name, 
         (xpath('/row/c/text()', 
         query_to_xml(format('SELECT COUNT(*) AS c FROM %I', table_name), true, true, '')))[1]::text::int AS row_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  ORDER BY table_name;
`;

// Function to fetch row counts from a database
async function fetchRowCounts(
  clientConfig: any,
  dbLabel: string
): Promise<Record<string, number>> {
  const client = new Client(clientConfig);
  await client.connect();
  try {
    console.log(`Fetching row counts from ${dbLabel} database...`);
    const res = await client.query(rowCountQuery);
    const counts: Record<string, number> = {};
    res.rows.forEach((row) => {
      counts[row.table_name] = row.row_count;
    });
    return counts;
  } catch (error) {
    console.error(`Error fetching row counts from ${dbLabel}:`, error);
    throw error;
  } finally {
    await client.end();
  }
}

// Function to compare local and cloud row counts and return comparison results
export async function compareDatabases(): Promise<{
  matches: string[];
  mismatches: string[];
  extraTables: string[];
}> {
  try {
    const localCounts = await fetchRowCounts(localDbConfig, "LOCAL");
    const cloudCounts = await fetchRowCounts(cloudDbConfig, "CLOUD");

    const matches: string[] = [];
    const mismatches: string[] = [];
    const extraTables: string[] = [];

    // Compare common tables
    Object.keys(localCounts).forEach((table) => {
      const localCount = localCounts[table] || 0;
      const cloudCount = cloudCounts[table] || 0;

      if (localCount !== cloudCount) {
        mismatches.push(
          `Mismatch: Table ${table} - LOCAL: ${localCount}, CLOUD: ${cloudCount}`
        );
      } else {
        matches.push(
          `Match: Table ${table} - LOCAL: ${localCount}, CLOUD: ${cloudCount}`
        );
      }
    });

    // Check if there are tables in cloud that do not exist in local
    Object.keys(cloudCounts).forEach((table) => {
      if (!(table in localCounts)) {
        extraTables.push(
          `Extra table in CLOUD: ${table} with ${cloudCounts[table]} rows`
        );
      }
    });

    return { matches, mismatches, extraTables };
  } catch (error) {
    console.error("Error during database comparison:", error);
    throw error;
  }
}
