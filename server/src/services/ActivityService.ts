import { Activity, ActivityTypeEnum, Prisma, PrismaClient, User } from '@prisma/client'

import { ActivityDataset, AnalyticsOverview, ArticleAnalyticsResult } from '../types'
import PrismaService from './PrismaService'

export default class ActivityService extends PrismaService {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient)
  }

  async createActivity(articleId: number, action: ActivityTypeEnum) {
    return await this.prismaClient.activity.create({
      data: {
        articleId,
        action,
      },
    })
  }

  async getArticleAnalyticsByDate(
    startDate: Date,
    endDate: Date,
    dimensions: ActivityTypeEnum,
  ): Promise<ArticleAnalyticsResult[]> {
    const bestArticles = await this.prismaClient.article.findMany({
      take: 5,
      include: {
        activities: {
          where: {
            action: dimensions,
          },
        },
      },
      orderBy: {
        activities: {
          _count: 'desc',
        },
      },
    })

    const activities = await this.prismaClient.activity.groupBy({
      by: ['articleId', 'action', 'createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        articleId: {
          in: bestArticles.map((article) => article.id),
        },
        action: dimensions,
      },
      _count: {
        action: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const result = bestArticles.map((article) => {
      const articleActivities = activities.filter((activity) => activity.articleId === article.id)

      const dataset = this.groupActivitiesByDate(articleActivities, startDate, endDate)

      return {
        article,
        dataset,
      }
    })

    return result
  }

  private groupActivitiesByDate(
    activities: (Prisma.PickEnumerable<
      Prisma.ActivityGroupByOutputType,
      ('createdAt' | 'action' | 'articleId')[]
    > & {
      _count: {
        action: number
      }
    })[],
    startDate: Date,
    endDate: Date,
  ): ActivityDataset[] {
    const groupedByDate = activities.reduce(
      (acc, activity) => {
        const date = activity.createdAt.toISOString().split('T')[0]
        if (!acc[date]) {
          acc[date] = {
            likes: 0,
            views: 0,
            shares: 0,
          }
        }

        switch (activity.action) {
          case ActivityTypeEnum.LIKE_ARTICLE:
            acc[date].likes = activity._count.action
            break
          case ActivityTypeEnum.VIEW_ARTICLE:
            acc[date].views = activity._count.action
            break
          case ActivityTypeEnum.SHARE_ARTICLE:
            acc[date].shares = activity._count.action
            break
        }

        return acc
      },
      {} as Record<string, { likes: number; views: number; shares: number }>,
    )

    // Fill in all dates between start and end
    const currentDate = new Date(startDate)
    const endDateObj = new Date(endDate)
    while (currentDate <= endDateObj) {
      const dateStr = currentDate.toISOString().split('T')[0]
      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = {
          likes: 0,
          views: 0,
          shares: 0,
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return Object.entries(groupedByDate)
      .map(([date, metrics]) => ({
        date,
        metrics,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  async getAnalyticsOverview(startDate: Date, endDate: Date): Promise<AnalyticsOverview> {
    const activities = await this.prismaClient.activity.groupBy({
      by: ['action', 'createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    const metrics = {
      totalViews: activities.reduce(
        (acc, activity) => acc + (activity.action === ActivityTypeEnum.VIEW_ARTICLE ? 1 : 0),
        0,
      ),
      totalLikes: activities.reduce(
        (acc, activity) => acc + (activity.action === ActivityTypeEnum.LIKE_ARTICLE ? 1 : 0),
        0,
      ),
      totalShares: activities.reduce(
        (acc, activity) => acc + (activity.action === ActivityTypeEnum.SHARE_ARTICLE ? 1 : 0),
        0,
      ),
    }

    return metrics
  }
}
