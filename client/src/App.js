import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

const TodosQuery = gql`
{
  todos {
    id
    text
    complete
  }
}
`;

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hello From React and GraphQL.
      </div>
    );
  }
}

export default graphql(TodosQuery)(App);
//export default App;
