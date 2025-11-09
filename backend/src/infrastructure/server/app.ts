import express from "express";
import cors from "cors";
import authRoutes from "../../adapters/inbound/http/routes/auth.routes";
import routeRoutes from "../../adapters/inbound/http/routes/route.routes";
import cbRoutes from "../../adapters/inbound/http/routes/cb.routes";
import bankRoutes from "../../adapters/inbound/http/routes/bank.routes";
import { errorHandler } from "../../shared/errors/ErrorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/cb", cbRoutes);
app.use("/api/bank", bankRoutes);

app.use(errorHandler);

export default app;
