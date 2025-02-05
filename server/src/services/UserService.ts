import { PrismaClient, User } from '@prisma/client'

import PrismaService from './PrismaService'

export default class UserService extends PrismaService {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient)
  }

  async getUsers() {
    return await this.prismaClient.user.findMany()
  }

  async getUserById(id: number) {
    return await this.prismaClient.user.findFirst({
      where: { id },
    })
  }

  async createUser(name: string, email: string, username: string, password: string) {
    return await this.prismaClient.user.create({
      data: {
        name,
        email,
        username,
        password,
      },
    })
  }

  async updateUser(id: number, name: string, email: string, username: string, password: string) {
    console.log('name: ', name)
    console.log('id: ', id)
    console.log('email: ', email)
    console.log('username: ', username)
    console.log('password: ', password)
    return await this.prismaClient.user.update({
      where: { id },
      data: {
        name,
        email,
        username,
        password,
      },
    })
  }

  async deleteUser(id: number) {
    return await this.prismaClient.user.delete({
      where: { id },
    })
  }
}
