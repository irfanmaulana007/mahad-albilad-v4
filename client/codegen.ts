import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    documents: ['./services/**/*.ts'],
    generates: {
        './__generated__/gql/': {
            preset: 'client',
            plugins: [],
        },
    },
}

export default config
