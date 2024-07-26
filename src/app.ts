import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { env } from "./env";
import { createEventRoute } from "./routes/events/create";
import { DuplicatedResourceError } from "./use-cases/errors/duplicated-resource-error";
import { registerForEventRoute } from "./routes/attendees/register-for-event";
import { MaximumAvailableResourcesBeenReached } from "./use-cases/errors/maximum-available-resources-been-reached";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: "*",
});

app.register(createEventRoute);
app.register(registerForEventRoute);

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

  if (error instanceof DuplicatedResourceError) {
    return reply.status(409).send({ message: "Duplicated resource error." });
  }

  if (error instanceof MaximumAvailableResourcesBeenReached) {
    return reply
      .status(429)
      .send({
        message: "Maximum number of available resources has been reached.",
      });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
