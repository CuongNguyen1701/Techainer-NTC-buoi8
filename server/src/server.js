import express from "express";
import http from "http";
import fs from "fs";
import { router } from "./routes/routes.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8888;

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use(router);

server.listen(port, () => {
	console.log(`🚀 Server is running on port ${port} ...`);
});

process.on("SIGINT", () => {
	console.log("🤖 Server closed");
});
 