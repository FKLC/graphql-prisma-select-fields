# graphql-prisma-select-fields
This is a small helper library that helps you not over-fetch while using GraphQL with Prisma.

### Example
```js
import gqlSelectConverter from 'graphql-prisma-select-fields'

const app = fastify()

app.register(mercurius, {
  ...,
})


app.ready().then(() => {
  app.graphql.addHook('preExecution', async (schema, document, context) => {
    context['selectFields'] = gqlSelectConverter(document)
    ...
  })
})


// Models
export const ModelQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('models', {
      type: Model,
      resolve(source, args, ctx) {
        return ctx.prisma.account.findMany(ctx.selectFields.Model)
      }
    })
  },
})
```

Note that this is a really small library. You can customize it as you wish to fit to your codebase.