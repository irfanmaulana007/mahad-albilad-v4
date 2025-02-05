"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yoga = void 0;
const fetch_1 = require("@whatwg-node/fetch");
const graphql_1 = require("graphql");
const graphql_rate_limit_directive_1 = require("graphql-rate-limit-directive");
const graphql_yoga_1 = require("graphql-yoga");
require("../mutations");
require("../queries");
require("../schemas");
const ActivityService_1 = __importDefault(require("../services/ActivityService"));
const ArticleService_1 = __importDefault(require("../services/ArticleService"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const MediaService_1 = __importDefault(require("../services/MediaService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const prismaClient_1 = __importDefault(require("./prismaClient"));
const schemaBuilder_1 = __importDefault(require("./schemaBuilder"));
const authService = new AuthService_1.default(prismaClient_1.default);
const userService = new UserService_1.default(prismaClient_1.default);
const articleService = new ArticleService_1.default(prismaClient_1.default);
const activityService = new ActivityService_1.default(prismaClient_1.default);
const mediaService = new MediaService_1.default(prismaClient_1.default);
const { rateLimitDirectiveTransformer } = (0, graphql_rate_limit_directive_1.rateLimitDirective)({
    onLimit: (resource) => {
        const resetAt = new Date();
        resetAt.setTime(resetAt.getTime() + resource.msBeforeNext);
        const now = new Date();
        const seconds = Math.ceil(Math.abs(resetAt.getTime() - now.getTime()) / 1000);
        throw new graphql_1.GraphQLError(`Too many requests. Try again later in ${seconds}s`, {
            extensions: {
                code: 'APP_TOO_MANY_REQUESTS',
                message: {
                    en: `Too many requests. Try again later in ${seconds}s`,
                },
                http: {
                    status: 429,
                },
                resetAt,
            },
        });
    },
});
const schema = rateLimitDirectiveTransformer(schemaBuilder_1.default.toSchema());
exports.yoga = (0, graphql_yoga_1.createYoga)({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
    fetchAPI: (0, fetch_1.createFetch)({}),
    context: async (context) => {
        let user = null;
        const authorization = context.request.headers.get('authorization');
        if (authorization) {
            const token = await authService.verifyToken(authorization, process.env.AUTH_JWT_ACCESS_SECRET);
            user = await userService.getUserById(token.userId);
        }
        return {
            ArticleService: articleService,
            ActivityService: activityService,
            AuthService: authService,
            UserService: userService,
            MediaService: mediaService,
            user,
        };
    },
    multipart: true,
    plugins: [{}],
});
//# sourceMappingURL=yoga.js.map