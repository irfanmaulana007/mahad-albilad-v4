import schemaBuilder from '../libs/schemaBuilder'

schemaBuilder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id', { nullable: false }),
    email: t.exposeString('email', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    username: t.exposeString('username', { nullable: false }),
    articles: t.relation('articles', { nullable: false }),
  }),
})
