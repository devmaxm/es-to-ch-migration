import { ElasticSearchService } from "../elsatic/elasticksearch.service";
import { ClickHouseService } from "../clickhouse/clickhouse.service";
import { convertISOToDateTimeFormat } from "../utils/date";

// Initialize services
const esService = new ElasticSearchService();
const esClient = esService.getClient();

const clickhouseService = new ClickHouseService();
const clickhouseClient = clickhouseService.getClient();

/**
 * Main function to migrate data from ElasticSearch to ClickHouse
 */
async function migrate() {
  const scrollTimeout = "2m"; // how long scroll context is kept alive
  const batchSize = 500; // Number of documents to fetch per batch

  try {
    // Initial search query to get the first batch of users
    let response = await esClient.search({
      index: "users",
      scroll: scrollTimeout,
      size: batchSize,
      query: {
        match_all: {},
      },
    });

    let totalMigrated = 0;

    // Start processing in a loop to fetch and migrate all batches
    while (true) {
      const users = response.hits.hits.map((hit: any) => hit._source);

      // If no users are returned, break the loop
      if (users.length === 0) {
        break;
      }

      // Insert the current batch of users into ClickHouse
      await clickhouseClient.command({
        query:
          `INSERT INTO users (name, email, platform, created_at) FORMAT JSONEachRow\n` +
          users
            .map((u) =>
              JSON.stringify({
                name: u.name,
                email: u.email,
                platform: u.platform,
                created_at: convertISOToDateTimeFormat(u.created_at),
              })
            )
            .join("\n"),
      });

      totalMigrated += users.length;
      console.log(`Migrated batch: ${users.length} (total: ${totalMigrated})`);

      // Get next batch
      const scrollId = response._scroll_id;
      if (!scrollId) {
        break;
      }

      response = await esClient.scroll({
        scroll_id: scrollId,
        scroll: scrollTimeout,
      });
    }

    console.log(`Migration complete: ${totalMigrated} users migrated`);
  } catch (error) {
    console.error(`Error migration users: `, error);
  }
}

migrate();
