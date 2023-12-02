const express = require("express");
const config = require("./shared/config");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output");

const handleError = require("./shared/errors/handle");

app.use(cors());
app.use(express.json());

const adminRoute = require("./modules/admin/_api");
const AuthorRoute = require("./modules/author/_api");
const ChannelRoute = require("./modules/channel/_api");
const MyVideoRoute = require("./modules/videos/_api");
const CommentRoute = require("./modules/comments/_api");
const CategoryRoute = require("./modules/categories/_api");

app.use(adminRoute);
app.use(AuthorRoute);
app.use(ChannelRoute);
app.use(MyVideoRoute);
app.use(CommentRoute);
app.use(CategoryRoute);
app.get("/uploads/:filename", (req, res) => {
  res.sendFile(process.cwd() + `/uploads/${req.params.filename}`);
});

db();

app.use(handleError);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(config.port, () => {
  console.log(`SERVER HAS BEEN STARTED ON PORT:${config.port}`);
});
