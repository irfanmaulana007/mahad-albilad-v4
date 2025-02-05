import { PrismaClient, User } from '@prisma/client'

import PrismaService from './PrismaService'

export default class ArticleService extends PrismaService {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient)
  }

  async getArticles() {
    return await this.prismaClient.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getArticleById(id: number) {
    return await this.prismaClient.article.findUnique({
      where: { id },
    })
  }

  async getArticleBySlug(slug: string) {
    return await this.prismaClient.article.findUnique({
      where: { slug },
    })
  }

  async createArticle(
    title: string,
    content: string,
    authorId: number,
    shortDescription: string,
    thumbnail: string,
  ) {
    let slug = title.toLowerCase().replace(/ /g, '-')

    while (await this.getArticleBySlug(slug)) {
      slug += '-'
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
    })
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    authorId: number,
    slug: string,
    shortDescription: string,
    thumbnail: string,
  ) {
    return await this.prismaClient.article.update({
      where: { id },
      data: {
        title,
        content,
        authorId,
        slug,
        shortDescription,
      },
    })
  }

  async deleteArticle(id: number) {
    return await this.prismaClient.article.delete({
      where: { id },
    })
  }
}
