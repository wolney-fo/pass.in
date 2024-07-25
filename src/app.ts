import cors from "@fastify/cors";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { eventsRoutes } from "./http/controllers/events/routes";

export const app = fastify();

app.register(cors, {
  origin: "*",
});

app.register(eventsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
