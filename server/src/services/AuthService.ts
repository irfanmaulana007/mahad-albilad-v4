import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import {
  authInvalidCredentialsError,
  authInvalidRefreshTokenError,
  authTokenExpiredError,
  authUnknownError,
} from '../errors/AuthServiceErrors'
import PrismaService from './PrismaService'

export default class AuthService extends PrismaService {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient)
  }

  private async generateAccessToken(userId: number) {
    return jwt.sign({ userId }, process.env.AUTH_JWT_ACCESS_SECRET as string, {
      expiresIn: '16d',
    })
  }

  private async generateRefreshToken(userId: number, jti: string) {
    return jwt.sign(
      {
        userId,
        jti,
      },
      process.env.AUTH_JWT_REFRESH_SECRET as string,
      {
        expiresIn: '30d',
      },
    )
  }

  private async hashToken(token: string) {
    return crypto.createHash('sha512').update(token).digest('hex')
  }

  private async generateTokens(userId: number, jti: string) {
    const accessToken = await this.generateAccessToken(userId)
    const refreshToken = await this.generateRefreshToken(userId, jti)

    return {
      accessToken,
      refreshToken,
    }
  }

  private async hashPassword(password: string) {
    return bcrypt.hashSync(password, 12)
  }

  private async createRefreshToken(jti: string, refreshToken: string, userId: number) {
    const hashedRefreshToken = await this.hashToken(refreshToken)

    await this.prismaClient.userRefreshToken.create({
      data: {
        id: jti,
        hashedToken: hashedRefreshToken,
        userId,
      },
    })
  }

  async verifyToken(token: string, secret: string): Promise<{ userId: number; jti?: string }> {
    try {
      const payload = jwt.verify(token, secret) as any
      return payload
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw authTokenExpiredError
      }
      throw authUnknownError
    }
  }

  private async parseRefreshToken(
    refreshToken: string,
  ): Promise<{ userId: number; jti: string } | null> {
    const token = await this.verifyToken(
      refreshToken,
      process.env.AUTH_JWT_REFRESH_SECRET as string,
    )

    const existingRefreshToken = await this.prismaClient.userRefreshToken.findFirst({
      where: {
        id: token.jti,
      },
    })

    if (!existingRefreshToken || !!existingRefreshToken.revoked) {
      return null
    }

    const hashedToken = await this.hashToken(refreshToken)
    if (hashedToken !== existingRefreshToken.hashedToken) {
      return null
    }

    return {
      userId: token.userId,
      jti: token.jti as string,
    }
  }

  private async deleteRefreshToken(refreshTokenId: string) {
    await this.prismaClient.userRefreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    })
  }

  async login(emailOrUsername: string, password: string) {
    const existingUserEmail = await this.prismaClient.user.findFirst({
      where: {
        email: emailOrUsername,
      },
    })
    const existingUserUsername = await this.prismaClient.user.findFirst({
      where: {
        username: emailOrUsername,
      },
    })
    const user = existingUserEmail || existingUserUsername

    if (!user) {
      throw authInvalidCredentialsError
    }

    const jti = uuidv4()

    const { accessToken, refreshToken } = await this.generateTokens(user.id, jti)

    await this.createRefreshToken(jti, refreshToken, user.id)

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(refreshToken: string) {
    const parsedRefreshToken = await this.parseRefreshToken(refreshToken)

    if (!parsedRefreshToken) {
      throw authInvalidRefreshTokenError
    }

    const user = await this.prismaClient.user.findFirst({
      where: {
        id: parsedRefreshToken.userId,
      },
    })

    if (!user) {
      throw authInvalidRefreshTokenError
    }

    await this.deleteRefreshToken(parsedRefreshToken.jti)

    const jti = uuidv4()
    const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user.id, jti)

    await this.createRefreshToken(jti, newRefreshToken, user.id)

    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }
}
