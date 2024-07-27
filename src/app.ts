import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { getAttendeeBadgeRoute } from "./routes/attendees/get-badge";
import { registerForEventRoute } from "./routes/attendees/register-for-event";
import { checkInRoute } from "./routes/check-ins/check-in";
import { createEventRoute } from "./routes/events/create";
import { getEventRoute } from "./routes/events/get";
import { getEventAttendeesRoute } from "./routes/events/get-attendees";
import { errorHandler } from "./utils/error-handler";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: "*",
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Pass.in",
      description:
        "API documentation for Pass.in, a participant management application for in-person events.",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

// Events
app.register(createEventRoute);
app.register(getEventRoute);
app.register(getEventAttendeesRoute);

// Attendees
app.register(registerForEventRoute);
app.register(getAttendeeBadgeRoute);

// Check-ins
app.register(checkInRoute);

app.setErrorHandler(errorHandler);
