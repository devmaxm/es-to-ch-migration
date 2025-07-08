import winston from "winston";
import LokiTransport from "winston-loki";
import { config } from "dotenv";
config()

const logger = winston.createLogger({
  transports: [
    new LokiTransport({
      host: process.env.LOKI_HOST || "http://localhost:3100", // or your loki container name in docker
      labels: { job: "migration-script" },
    }),
    new winston.transports.Console(),
  ],
});

export default logger