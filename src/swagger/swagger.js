const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.js";
const endpointsFiles = ["../index.js"];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("./src/index");
});
