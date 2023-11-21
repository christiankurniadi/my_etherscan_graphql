const { ApolloServer } = require("apollo-server") // Import ApolloServer from apollo-server
const { importSchema } = require("graphql-import") // Import importSchema from graphql-import
const EtherDataSource = require("./datasource/ethDatasource") // Import EtherDataSource class

const typeDefs = importSchema("./schema.graphql") // Import schema from schema.graphql file

require("dotenv").config() // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Resolver for etherBalanceByAddress query
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Resolver for totalSupplyOfEther query
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Resolver for latestEthereumPrice query
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Resolver for blockConfirmationTime query
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
}
// Create an ApolloServer instance
const server = new ApolloServer({
  // Specify the GraphQL schema
  typeDefs,
  // Define the resolvers
  resolvers,
  // Set up the data sources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
})
// Set timeout to 0 to disable timeouts
server.timeout = 0
// Start the server
server.listen("9000").then(({ url }) => {
  // Log message when server is ready
  console.log(`🚀 Server ready at ${url}`)
})
