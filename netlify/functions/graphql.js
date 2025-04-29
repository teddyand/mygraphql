const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { createHandler } = require('apollo-server-express');

// 示例数据（实际项目替换为数据库）
let users = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' }
];

// 1. 定义 Schema 和解析器（与原项目一致）
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }
    type Query {
        users: [User!]!
        user(id: ID!): User
    }
    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`;

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

// 2. 初始化 Apollo Server 并集成 Express
async function createServer() {
    const app = express();
    //app.use(cors()); // 允许跨域
    
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        // 生产环境建议关闭 Playground（注释以下行）
        playground: process.env.NODE_ENV !== 'production' 
    });
    
    await server.start();
    server.applyMiddleware({ app, path: '/' }); // 挂载到函数根路径
    app.get('/',(req,res) => res.end('Welcome to the PhotoShare API'))
  //app.get('/playground',expressPlayground({ endpoint: '/graphql' }))

   app.listen({ port: 4000 }, () => 
     console.log(`Graphql Server running @ http://localhost:4000${server.graphqlPath}`)
   ) 
    return app;
}

// 3. 适配 Netlify Functions 格式
exports.handler = async (event, context) => {
    // 修复 Netlify 函数的上下文限制（重要！）
    context.callbackWaitsForEmptyEventLoop = false;
    
    const app = await createServer();
    return new Promise((resolve, reject) => {
        // 将 Netlify 的 event/context 转换为 Express 请求
        const request = {
            ...event,
            body: event.body ? JSON.parse(event.body) : {},
            headers: event.headers,
            method: event.httpMethod,
            query: event.queryStringParameters
        };
        
        // 模拟 Express 响应对象
        const response = {
            statusCode: 200,
            headers: {},
            body: '',
            setHeader: (key, value) => { response.headers[key] = value; },
            send: (data) => { response.body = data; resolve(response); }
        };
        
        app(request, response, (err) => {
            if (err) reject(err);
            resolve(response);
        });
    });
}
    