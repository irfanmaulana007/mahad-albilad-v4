"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrismaService_1 = __importDefault(require("./PrismaService"));
class UserService extends PrismaService_1.default {
    constructor(prismaClient) {
        super(prismaClient);
    }
    async getUsers() {
        return await this.prismaClient.user.findMany();
    }
    async getUserById(id) {
        return await this.prismaClient.user.findFirst({
            where: { id },
        });
    }
    async createUser(name, email, username, password) {
        return await this.prismaClient.user.create({
            data: {
                name,
                email,
                username,
                password,
            },
        });
    }
    async updateUser(id, name, email, username, password) {
        console.log('name: ', name);
        console.log('id: ', id);
        console.log('email: ', email);
        console.log('username: ', username);
        console.log('password: ', password);
        return await this.prismaClient.user.update({
            where: { id },
            data: {
                name,
                email,
                username,
                password,
            },
        });
    }
    async deleteUser(id) {
        return await this.prismaClient.user.delete({
            where: { id },
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map