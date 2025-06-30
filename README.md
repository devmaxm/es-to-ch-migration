# User Data Migration from ElasticSearch to ClickHouse

This script is designed to generate seed user data and migrate it from ElasticSearch to ClickHouse. It connects to both databases, fetches the user data from ElasticSearch, and then inserts it into ClickHouse in batches.

## Features

- **Seed User Data Generation**: The script generates random user data, including name, email, platform, and creation date.
- **Data Migration**: It extracts user data from ElasticSearch and inserts it into the `users` table in ClickHouse.
- **Batch Migration**: The script processes data in batches of 500 records, using the scroll mechanism in ElasticSearch to handle large datasets efficiently.
- **Date Transformation**: The script converts the `created_at` field from ISO 8601 format to a format suitable for ClickHouse.

## Installation

1. Clone the repository to your working directory:

2. Install dependencies
```bash
$ npm install
```

3. Fill .env file from .env.example

4. Generate seed users
```bash
$ npm run seed:users
```

5. Migrate them to ClickHouse
```bash
$ npm run migrate:users
```
