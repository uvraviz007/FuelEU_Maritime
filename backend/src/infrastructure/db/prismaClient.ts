import { PrismaClient } from "@prisma/client";
import { logger } from "../../shared/utils/logger";

// Ensure single instance pattern
let prismaInstance: PrismaClient | null = null;

function getPrismaInstance(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  return prismaInstance;
}

// Create singleton instance
const prisma = getPrismaInstance();

// Verify initial connection
prisma.$connect()
  .then(() => {
    logger.info("Database connection established");
  })
  .catch((err) => {
    logger.error("Failed to connect to database:", err);
    process.exit(1);
  });

// Gracefully disconnect on various process signals
const cleanup = async () => {
  try {
    if (prismaInstance) {
      await prismaInstance.$disconnect();
      logger.info("Database connection closed");
    }
  } catch (err) {
    logger.error("Error disconnecting from database:", err);
    process.exit(1);
  }
};

process.on("beforeExit", cleanup);
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

export default prisma;
