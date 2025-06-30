import { Client } from "@elastic/elasticsearch";
import {config} from 'dotenv'

config()

export class ElasticSearchService {
    private readonly client = new Client({ node: process.env.ELASTIC_NODE });

    constructor() {
    }

    getClient(): Client {
        return this.client;
    }
}
