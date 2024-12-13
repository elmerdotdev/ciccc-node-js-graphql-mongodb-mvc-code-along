import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!,
    firstname: String,
    lastname: String,
    email: String,
    todos: [Todo]
  }

  type Todo {
    id: ID!,
    text: String,
    completed: Boolean,
    user: User
  }

  type Query {
    hello: String,
    users: [User],
    getUserById(userId: ID): User
    todos: [Todo]
  }

  type Mutation {
    addUser(firstname: String, lastname: String, email: String): User,
    editUser(id: ID, firstname: String, lastname: String, email: String): User,
    removeUser(id: ID): User

    addTodo(text: String, userId: ID): Todo
    editTodo(id: ID, text: String, completed: Boolean): Todo
    removeTodo(id: ID): Todo
  }
`