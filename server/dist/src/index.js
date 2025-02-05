"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const yoga_1 = require("./libs/yoga");
const app = (0, express_1.default)();
// app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'public', 'uploads')))
// app.use(yoga.graphqlEndpoint, yoga)
// const server = createServer(app)
const server = (0, node_http_1.createServer)(yoga_1.yoga);
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
});
//# sourceMappingURL=index.js.map