import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const TodosQuery = gql`
{
  todos {
    id
    text
    complete
  }
}
`;
//Define gql variables with $ and make sure variable types(ID,Boolean) match the mongoose schema
  //ex: $id: ID!
const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete) 
  }
`

class App extends Component {

  updateTodo = async todo => {
    //Update todo from database and frontend ui
    await this.props.updateTodo({
      variables: {
        id: todo.id,
        //input opposite of current complete value:
        complete: !todo.complete
      }
    });
  };
  removeTodo = todo => {
    //Remove todo from database and frontend ui

  };
  
  render() {
    //Save the mongodb todos and loading status to props
    const {data: {loading, todos}} = this.props;
    
    return loading ? null 
    : <div style = {{display: "flex"}}>
        <div style = {{margin: "auto", width: 400}}>
          {/* Paper component is a material ui background */}
          <Paper elevation={1}>
            <List>
              {todos.map(todo => (
                <ListItem
                  key={todo.id}
                  role={undefined}
                  dense
                  button
                  onClick={() => this.updateTodo(todo)}
                >
                  <Checkbox
                    checked={todo.complete}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={todo.text} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.removeTodo(todo)}>
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
              ))}
            </List>
          </Paper>
          
        </div>
    </div>
  }
}



export default compose (
  graphql(UpdateMutation, {name: "updateTodo"}),
  graphql(TodosQuery),
)(App);


