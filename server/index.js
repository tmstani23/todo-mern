//Import server dependencies:
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

//connect to mongo database - test1 is the database name
mongoose.connect('mongodb://localhost/test2', { useNewUrlParser: true });

//Create mongoose models:
const Todo = mongoose.model("Todo", {
  text: String,
  complete: Boolean
});

//Create graphql schema:
//exclamation makes string argument required
const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [Todo] 
  }
  type Todo {
    id: ID!
    text: String!
    complete: Boolean!
  }
  type Mutation {
    createTodo(text: String!): Todo
    updateTodo(id: ID!, complete: Boolean!): Boolean
  }
`;
//Setup graphql action resolvers:
const resolvers = {
  //adding "_," as the first argument is adding an empty parameter to the function
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    todos: () => Todo.find()
  },
  Mutation: {
    createTodo: async (_, { text }) => {
      const todo = new Todo({ text, complete: false });
      //todo is a promise so must be awaited until async is resolved
      //Save the new todo object to the database
      await todo.save();
      return todo;
    },
    updateTodo: async (_, {id, complete}) => {
      await Todo.findOneAndUpdate(id, {complete});
      return true;
    }
  }
}
//initialize graphql server variable:
const server = new GraphQLServer({ typeDefs, resolvers });

//Handle connection errors:
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
//Open the connection and return a callback starting the server.
mongoose.connection.once('open', function() {
  //start the graphql server
  server.start(() => console.log('Server is running on localhost:4000'))
});

