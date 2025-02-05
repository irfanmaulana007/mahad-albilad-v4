"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrismaService_1 = __importDefault(require("./PrismaService"));
class ArticleService extends PrismaService_1.default {
    constructor(prismaClient) {
        super(prismaClient);
    }
    async getArticles() {
        return await this.prismaClient.article.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getArticleById(id) {
        return await this.prismaClient.article.findUnique({
            where: { id },
        });
    }
    async getArticleBySlug(slug) {
        return await this.prismaClient.article.findUnique({
            where: { slug },
        });
    }
    async createArticle(title, content, authorId, shortDescription, thumbnail) {
        let slug = title.toLowerCase().replace(/ /g, '-');
        while (await this.getArticleBySlug(slug)) {
            slug += '-';
        }
        return await this.prismaClient.article.create({
            data: {
                title,
                content,
                authorId,
                slug,
                shortDescription,
                thumbnail: thumbnail,
            },
        });
    }
    async updateArticle(id, title, content, authorId, slug, shortDescription, thumbnail) {
        return await this.prismaClient.article.update({
            where: { id },
            data: {
                title,
                content,
                authorId,
                slug,
                shortDescription,
            },
        });
    }
    async deleteArticle(id) {
        return await this.prismaClient.article.delete({
            where: { id },
        });
    }
}
exports.default = ArticleService;
//# sourceMappingURL=ArticleService.js.map