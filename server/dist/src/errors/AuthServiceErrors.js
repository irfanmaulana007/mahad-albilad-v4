"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUnknownError = exports.authTokenExpiredError = exports.authInvalidRefreshTokenError = exports.authInvalidCredentialsError = exports.authUnauthorizedError = void 0;
const graphql_1 = require("graphql");
exports.authUnauthorizedError = new graphql_1.GraphQLError('You are not allowed to access this query or mutation!', {
    extensions: {
        code: 'AUTH_UNAUTHORIZED_ERROR',
        message: {
            en: 'You are not allowed to access this query or mutation!',
        },
        http: {
            status: 403,
        },
    },
});
exports.authInvalidCredentialsError = new graphql_1.GraphQLError('Invalid credentials!', {
    extensions: {
        code: 'AUTH_USER_INVALID_CREDENTIALS',
        message: {
            en: 'Invalid credentials!',
        },
        http: {
            status: 422,
        },
    },
});
exports.authInvalidRefreshTokenError = new graphql_1.GraphQLError('Invalid Refresh Token', {
    extensions: {
        code: 'AUTH_USER_INVALID_REFRESH_TOKEN',
        message: {
            en: 'Invalid Refresh Token',
        },
        http: {
            status: 409,
        },
    },
});
exports.authTokenExpiredError = new graphql_1.GraphQLError('Token Expired', {
    extensions: {
        code: 'AUTH_TOKEN_EXPIRED',
        message: {
            en: 'Token Expired',
        },
        http: {
            status: 401,
        },
    },
});
exports.authUnknownError = new graphql_1.GraphQLError('Unknown error', {
    extensions: {
        code: 'AUTH_UNKNOWN_ERROR',
        message: {
            en: 'Unknown error',
        },
        http: {
            status: 500,
        },
    },
});
//# sourceMappingURL=AuthServiceErrors.js.map