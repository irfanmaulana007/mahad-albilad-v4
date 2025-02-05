import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

import { MediaUploadResult } from '../types'
import PrismaService from './PrismaService'

export default class MediaService extends PrismaService {
  private uploadDir: string

  constructor(prismaClient: PrismaClient) {
    super(prismaClient)
    this.uploadDir = path.join(process.cwd(), 'src', 'public', 'uploads')
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  private async saveFileToPublic(file: File): Promise<string> {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const fileExtension = path.extname(file.name)
    const fileName = `${uniqueSuffix}${fileExtension}`
    const filePath = path.join(this.uploadDir, fileName)

    const buffer = await file.arrayBuffer()
    await fs.promises.writeFile(filePath, Buffer.from(buffer))
    return fileName
  }

  async uploadMedia(file: File): Promise<MediaUploadResult> {
    const publicUrl = await this.saveFileToPublic(file)
    return { status: 'success', url: publicUrl }
  }
}
