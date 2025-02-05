import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.objectType('MediaUploadResult', {
  fields: (t) => ({
    status: t.exposeString('status', { nullable: false }),
    url: t.exposeString('url', { nullable: false }),
  }),
})
