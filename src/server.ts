import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { loggerMiddleware } from './middleware/logger.middleware'

// Create Express server
const app = express()

// Create Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

// Start Server
const startServer = async () => {
  try {
    // Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI!
    await mongoose.connect(MONGO_URI, { dbName: 'graphql' })
    console.log("Connected to MongoDB")

    // Apollo Server
    await apolloServer.start()

    // Unified middleware
    app.use(
      "/graphql",
      cors(),
      express.json(),
      loggerMiddleware,
      expressMiddleware(apolloServer)
    )

    // Express Server
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql...`)
    })
  } catch (err) {
    console.error(`Error starting server...`)
  }
}

startServer()