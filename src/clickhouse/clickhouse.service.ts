import { createClient } from "@clickhouse/client";
import { NodeClickHouseClient } from "@clickhouse/client/dist/client";
import {config} from 'dotenv'

config()

export class ClickHouseService {
    private readonly client = createClient({url: process.env.CLICKHOUSE_HOST})

    constructor() {
    }

    getClient(): NodeClickHouseClient {
        return this.client;
    }
}
