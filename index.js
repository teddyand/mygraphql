import express from 'express';
import  { ApolloServer, gql } from 'apollo-server-express';

// 定义GraphQL类型定义（Schema）
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

// 定义解析器函数
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo GraphQL Server!',
  },
};

// 创建Apollo服务器实例
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
await server.start()
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
});