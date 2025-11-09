import "dotenv/config";
import app from "./app";
import { logger } from "../../shared/utils/logger";
import prisma from "../db/prismaClient";

const port = process.env.PORT || 5000;

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      logger.info(`Server started on http://localhost:${port}`);
    });
  } catch (err: any) {
    logger.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
