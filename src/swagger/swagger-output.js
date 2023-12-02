const config = require("../shared/config/index");
const swagger_js = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "youtube api",
    description: "Documentation yoq",
  },
  host: `localhost:${config.port}`,
  basePath: "/",
  tags: [],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    // admin route
    "/admin": {
      get: {
        tags: ["Admin Router  "],
        produces: ["application/json"],
        summary: " Gets all Admin",
        parameters: [
          {
            name: "authorization",
            in: "header",
            description: "User information.",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
    },
    "/register/admin": {
      post: {
        tags: ["Admin Router  "],
        summary: "Adds a new user",
        description: "Endpoint to sign in a specific user",
        parameters: [
          {
            name: "authorization",
            in: "header",
            description: "User information.",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "obj",
            in: "body",
            description: "User information.",
            required: true,
            schema: {
              $ref: "#/definitions/schemas/AddAdmin",
            },
          },
        ],
        responses: {
          201: {
            description: "OK",
            content: "application/json",
          },
          400: {
            description: "Bad request, invalid input.",
          },
          401: { description: "Unauthorized, invalid credentials." },
          404: {
            description: "not found",
          },
        },
      },
    },
    "/login/admin": {
      post: {
        tags: ["Admin Router  "],
        summary: "User Authentication",
        description:
          "Authenticate a user by validating their credentials and return a token if successful.",
        parameters: [
          {
            name: "obj",
            in: "body",
            description: "User information.",
            required: true,
            schema: {
              $ref: "#/definitions/schemas/LoginAdmin",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
    },
    "/admin/{id}": {
      get: {
        tags: ["Admin Router  "],
        produces: ["application/json"],
        summary: "Gets a Admin  by Mongo ID.",
        description: "Endpoint to sigup in a specific user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User id information.",
            schema: {
              type: "integer",
              format: "int",
            },
          },
          {
            name: "authorization",
            in: "header",
            description: "Auth token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
      delete: {
        tags: ["Admin Router  "],
        produces: ["application/json"],
        summary: "Delete a Admin by MongoID.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User id information.",
            schema: {
              type: "integer",
              format: "int64",
            },
          },
          {
            name: "authorization",
            in: "header",
            description: "Auth token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
      patch: {
        tags: ["Admin Router  "],
        produces: ["application/json"],
        summary: "edit  Admin  by Mongo ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User id information.",
            schema: {
              type: "integer",
              format: "int",
            },
          },
          {
            name: "authorization",
            in: "header",
            description: "Auth token",
            schema: {
              type: "string",
            },
          },
          {
            name: "obj",
            in: "body",
            description: "User information.",
            required: true,
            schema: {
              $ref: "#/definitions/schemas/patchAdmin",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
    },
    "/admin/un/{id}": {
      delete: {
        tags: ["Admin Router  "],
        produces: ["application/json"],
        summary: "Delete a Admin by MongoID.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User id information.",
            schema: {
              type: "integer",
              format: "int64",
            },
          },
          {
            name: "authorization",
            in: "header",
            description: "Auth token",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
    },
    "/change/password/admin": {
      patch: {
        tags: ["Admin Router  "],
        summary: "User Authentication",
        description:
          "Authenticate a user by validating their credentials and return a token if successful.",
        parameters: [
          {
            name: "authorization",
            in: "header",
            description: "Auth token",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "obj",
            in: "body",
            description: "User information.",
            schema: {
              $ref: "#/definitions/schemas/ChangePassword",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: "application/json",
          },
        },
      },
    },
    // auhtor routes
  },
  definitions: {
    schemas: {
      AddAdmin: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            example: "Jhon Doe",
          },
          last_name: {
            type: "string",
            example: "Marie Doe",
          },
          image: {
            type: "string",
            example: "Jhon_Doe.png",
          },
          role: {
            type: "string",
            exsample: "admin or super_admin",
            default: "admin",
          },
          username: {
            type: "string",
            exsample: "ayubxon",
          },
          password: {
            type: "string",
            exsample: "!@#$%^&",
          },
        },
        required: ["first_name", "last_name", "image", "username", "password"],
      },
      LoginAdmin: {
        type: "object",
        properties: {
          username: {
            type: "string",
            exsample: "ayubxon",
          },
          password: {
            type: "string",
            exsample: "!@#$%^&",
          },
        },
        required: ["username", "password"],
      },
      patchAdmin: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            example: "Jhon Doe",
          },
          last_name: {
            type: "string",
            example: "Marie Doe",
          },
          image: {
            type: "string",
            example: "Jhon_Doe.png",
          },
          username: {
            type: "string",
            exsample: "ayubxon",
          },
        },
      },
      ChangePassword: {
        type: "object",
        properties: {
          current_password: {
            type: "string",
            exsample: "!@#$%^&*",
          },
          new_password: {
            type: "string",
            exsample: "*&^%$#@!",
          },
        },
        required: ["current_password", "new_password"],
      },
    },
  },
};

module.exports = swagger_js;
