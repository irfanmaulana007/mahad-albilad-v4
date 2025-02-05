"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const AuthServiceErrors_1 = require("../errors/AuthServiceErrors");
const PrismaService_1 = __importDefault(require("./PrismaService"));
class AuthService extends PrismaService_1.default {
    constructor(prismaClient) {
        super(prismaClient);
    }
    async generateAccessToken(userId) {
        return jsonwebtoken_1.default.sign({ userId }, process.env.AUTH_JWT_ACCESS_SECRET, {
            expiresIn: '16d',
        });
    }
    async generateRefreshToken(userId, jti) {
        return jsonwebtoken_1.default.sign({
            userId,
            jti,
        }, process.env.AUTH_JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });
    }
    async hashToken(token) {
        return crypto_1.default.createHash('sha512').update(token).digest('hex');
    }
    async generateTokens(userId, jti) {
        const accessToken = await this.generateAccessToken(userId);
        const refreshToken = await this.generateRefreshToken(userId, jti);
        return {
            accessToken,
            refreshToken,
        };
    }
    async hashPassword(password) {
        return bcrypt_1.default.hashSync(password, 12);
    }
    async createRefreshToken(jti, refreshToken, userId) {
        const hashedRefreshToken = await this.hashToken(refreshToken);
        await this.prismaClient.userRefreshToken.create({
            data: {
                id: jti,
                hashedToken: hashedRefreshToken,
                userId,
            },
        });
    }
    async verifyToken(token, secret) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, secret);
            return payload;
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw AuthServiceErrors_1.authTokenExpiredError;
            }
            throw AuthServiceErrors_1.authUnknownError;
        }
    }
    async parseRefreshToken(refreshToken) {
        const token = await this.verifyToken(refreshToken, process.env.AUTH_JWT_REFRESH_SECRET);
        const existingRefreshToken = await this.prismaClient.userRefreshToken.findFirst({
            where: {
                id: token.jti,
            },
        });
        if (!existingRefreshToken || !!existingRefreshToken.revoked) {
            return null;
        }
        const hashedToken = await this.hashToken(refreshToken);
        if (hashedToken !== existingRefreshToken.hashedToken) {
            return null;
        }
        return {
            userId: token.userId,
            jti: token.jti,
        };
    }
    async deleteRefreshToken(refreshTokenId) {
        await this.prismaClient.userRefreshToken.delete({
            where: {
                id: refreshTokenId,
            },
        });
    }
    async login(emailOrUsername, password) {
        const existingUserEmail = await this.prismaClient.user.findFirst({
            where: {
                email: emailOrUsername,
            },
        });
        const existingUserUsername = await this.prismaClient.user.findFirst({
            where: {
                username: emailOrUsername,
            },
        });
        const user = existingUserEmail || existingUserUsername;
        if (!user) {
            throw AuthServiceErrors_1.authInvalidCredentialsError;
        }
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = await this.generateTokens(user.id, jti);
        await this.createRefreshToken(jti, refreshToken, user.id);
        return {
            accessToken,
            refreshToken,
        };
    }
    async refreshToken(refreshToken) {
        const parsedRefreshToken = await this.parseRefreshToken(refreshToken);
        if (!parsedRefreshToken) {
            throw AuthServiceErrors_1.authInvalidRefreshTokenError;
        }
        const user = await this.prismaClient.user.findFirst({
            where: {
                id: parsedRefreshToken.userId,
            },
        });
        if (!user) {
            throw AuthServiceErrors_1.authInvalidRefreshTokenError;
        }
        await this.deleteRefreshToken(parsedRefreshToken.jti);
        const jti = (0, uuid_1.v4)();
        const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user.id, jti);
        await this.createRefreshToken(jti, newRefreshToken, user.id);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map