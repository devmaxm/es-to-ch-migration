import { faker } from "@faker-js/faker"; // Import faker for generating fake data
import { ElasticSearchService } from "../elsatic/elasticksearch.service"; // Import Elasticsearch service for interaction with ES
import logger from '../logger/winston';

// Create an instance of ElasticSearchService to connect to ES
const esService = new ElasticSearchService();
const esClient = esService.getClient();

// Possible platforms a user could be registered on
const PLATFORMS = ["tiktok", "instagram", "facebook", "youtube"];

/**
 * Generates and inserts fake users into Elasticsearch.
 *
 * @param count - The number of users to generate (default is 180000)
 */
async function seedUsers(count = 180000) {
    // Check for valid count value
    logger.info(`Seeding ${count} users to Elasticsearch...`);
    if (count <= 0) {
        logger.info("The number of users must be greater than 0.");
        return;
    }

    const operations: any[] = [];

    // Generate data for each user
    for (let i = 1; i <= count; i++) {
        // Create index operation for each user
        operations.push(
            { index: { _index: "users" } }, // Indexing operation for Elasticsearch
            {
                name: faker.person.fullName(), // Generate random full name
                email: faker.internet.email(), // Generate random email address
                platform: faker.helpers.arrayElement(PLATFORMS), // Select a random platform
                created_at: faker.date.past().toISOString(), // Generate a random creation date
            },
        );
    }

    // Execute the bulk request in Elasticsearch
    try {
        await esClient.bulk({ refresh: true, operations });
        logger.info(`${count} users inserted into Elasticsearch`);
    } catch (error) {
        logger.error("Error inserting users into Elasticsearch:", error);
    }
}

seedUsers();
