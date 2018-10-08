//Import server dependencies:
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

//connect to mongo database - test1 is the database name
mongoose.connect('mongodb://localhost:4000/test1', { useNewUrlParser: true });

//Create mongoose models:
// const Todo = mongoose.model("Todo", {
//   text: String,
//   complete: Boolean
// });

//Create graphql schema:
//exclamation makes string argument required
const typeDefs = `
  type Query {
    hello(name: String): String! 
  }
`;
//Setup graphql action resolvers:
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`
  }
}
//initialize graphql server variable:
const server = new GraphQLServer({ typeDefs, resolvers })

//Open the connection and return a callback starting the server.

  //start the graphql server
  server.start(() => console.log('Server is running on localhost:4000'))

