import swaggerJSDoc from "swagger-jsdoc";

export const swaggerDocument = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LinkedAI API",
      version: "1.0.0",
      description: "Enterprise LinkedIn AI SaaS API"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        AuthResponse: {
          type: "object",
          properties: {
            user: { type: "object" },
            accessToken: { type: "string" },
            refreshToken: { type: "string" }
          }
        },
        GenerateRequest: {
          type: "object",
          required: ["topic", "industry", "audience", "tone"],
          properties: {
            topic: { type: "string", example: "AI automation for SMB sales" },
            industry: { type: "string", example: "SaaS" },
            audience: { type: "string", example: "B2B founders" },
            tone: { type: "string", example: "Professional" },
            cta: { type: "string", example: "Comment LINKEDAI" }
          }
        }
      }
    }
  },
  apis: ["./routes/**/*.ts", "./controllers/**/*.ts"]
});