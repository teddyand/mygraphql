const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');

// 示例数据（实际项目中应替换为数据库）
let users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' }
];

// 1. 定义 GraphQL 类型和请求（Schema）
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User!]!       # 获取所有用户
        user(id: ID!): User   # 根据 ID 获取单个用户
    }

    type Mutation {
        createUser(name: String!, email: String!): User!  # 创建新用户
    }
`;

// 2. 定义解析器（处理请求逻辑）
const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id)
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            const newUser = {
                id: String(users.length + 1),
                name,
                email
            };
            users.push(newUser);
            return newUser;
        }
    }
};

// 3. 启动 Express 和 Apollo Server
async function startServer() {
    const app = express();
    
    // 可选：配置 CORS（跨域）
    //app.use(cors());
    
    // 初始化 Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    
    // 将 Apollo Server 集成到 Express
    server.applyMiddleware({ app, path: '/graphql' });

    // 启动服务器
    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () => {
        console.log(`GraphQL 服务器运行于 http://localhost:${PORT}${server.graphqlPath}`);
    });
}

// 执行启动函数
startServer();
    