import { ActivityTypeEnum } from '@prisma/client'

import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.mutationField('uploadMedia', (t) =>
  t.field({
    type: 'MediaUploadResult',
    args: {
      file: t.arg({
        type: 'File',
        required: true,
      }),
    },
    resolve: async (parent, args, context, info) => {
      return await context.MediaService.uploadMedia(args.file as File)
    },
  }),
)
