import { PrismaClient } from '@prisma/client'

import ServiceBase from './ServiceBase'

export default class PrismaService extends ServiceBase {
  protected prismaClient: PrismaClient

  constructor(prismaClient: PrismaClient) {
    super()
    this.prismaClient = prismaClient
  }
}
