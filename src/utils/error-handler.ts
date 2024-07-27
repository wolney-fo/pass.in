import { FastifyInstance } from "fastify/types/instance";
import { ZodError } from "zod";
import { env } from "../env";
import { DuplicatedResourceError } from "../use-cases/errors/duplicated-resource-error";
import { MaximumAvailableResourcesBeenReached } from "../use-cases/errors/maximum-available-resources-been-reached";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.flatten().fieldErrors,
    });
  }

  if (error instanceof DuplicatedResourceError) {
    return reply.status(409).send({ message: "Duplicated resource error." });
  }

  if (error instanceof MaximumAvailableResourcesBeenReached) {
    return reply.status(429).send({
      message: "Maximum number of available resources has been reached.",
    });
  }

  return reply.status(500).send({ message: "Internal server error." });
};
