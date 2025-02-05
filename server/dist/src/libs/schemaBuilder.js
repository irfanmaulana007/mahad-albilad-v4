"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@pothos/core"));
const plugin_directives_1 = __importDefault(require("@pothos/plugin-directives"));
const plugin_prisma_1 = __importDefault(require("@pothos/plugin-prisma"));
const plugin_scope_auth_1 = __importDefault(require("@pothos/plugin-scope-auth"));
const plugin_validation_1 = __importDefault(require("@pothos/plugin-validation"));
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const AuthServiceErrors_1 = require("../errors/AuthServiceErrors");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const schemaBuilder = new core_1.default({
    plugins: [plugin_prisma_1.default, plugin_scope_auth_1.default, plugin_validation_1.default, plugin_directives_1.default],
    scopeAuth: {
        authScopes: async (context) => ({
            anonymous: !context.user,
            authenticated: !!context.user,
        }),
        treatErrorsAsUnauthorized: true,
        unauthorizedError: () => {
            return AuthServiceErrors_1.authUnauthorizedError;
        },
    },
    prisma: {
        client: prismaClient_1.default,
    },
    validationOptions: {
        validationError: (zodError) => {
            return new graphql_1.GraphQLError('Invalid input arguments!', {
                extensions: {
                    code: 'INVALID_INPUT_ARGUMENTS',
                    message: {
                        en: `${zodError.message}`,
                    },
                    http: {
                        status: 400,
                    },
                },
            });
        },
    },
});
schemaBuilder.queryType({});
schemaBuilder.mutationType({});
schemaBuilder.addScalarType('Date', graphql_scalars_1.DateResolver, {});
schemaBuilder.addScalarType('Timestamp', graphql_scalars_1.TimestampResolver, {});
schemaBuilder.scalarType('File', {
    serialize: () => {
        throw new Error('Uploads can only be used as input types');
    },
});
exports.default = schemaBuilder;
//# sourceMappingURL=schemaBuilder.js.map