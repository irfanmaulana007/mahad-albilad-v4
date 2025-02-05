import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import path from 'path'

import { yoga } from './libs/yoga'

const app = express()

// app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'public', 'uploads')))
// app.use(yoga.graphqlEndpoint, yoga)

// const server = createServer(app)
const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
