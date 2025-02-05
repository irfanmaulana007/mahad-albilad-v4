import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.objectType('AuthUserResult', {
  fields: (t) => ({
    accessToken: t.exposeString('accessToken'),
    refreshToken: t.exposeString('refreshToken'),
  }),
})
