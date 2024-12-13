import todoController from "../controllers/todo.controller"
import userController from "../controllers/user.controller"
import { ITodo } from "../types/todo"
import { IUser } from "../types/user"

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    users: async () => await userController.getUsers(),
    getUserById: async (_: unknown, { userId }: { userId: string }) =>
      await userController.getUserById(userId),
    todos: async () => await todoController.getTodos()
  },
  Mutation: {
    /** User */
    addUser: async (_: unknown, { firstname, lastname, email }: Omit<IUser, 'id'>) =>
      await userController.createUser({ firstname, lastname, email }),
    editUser: async (_: unknown, { id, firstname, lastname, email }: IUser) =>
      await userController.updateUser(id, { firstname, lastname, email }),
    removeUser: async (_: unknown, { id }: { id: string }) =>
      await userController.deleteUser(id),
    /** Todo */
    addTodo: async (_: unknown, { text, userId }: Omit<ITodo, 'id'>) =>
      await todoController.createTodo({ text, completed: false, userId }),
    editTodo: async (_: unknown, { id, text, completed }: ITodo) =>
      await todoController.updateTodo(id, { text, completed }),
    removeTodo: async (_: unknown, { id }: { id: string }) =>
      await todoController.deleteTodo(id)
  },
  User: {
    todos: async (parent: { id: string }) =>
      await todoController.getTodosByUserId(parent.id)
  },
  Todo: {
    user: async (parent: { userId: string }) =>
      await userController.getUserById(parent.userId)
  }
}
