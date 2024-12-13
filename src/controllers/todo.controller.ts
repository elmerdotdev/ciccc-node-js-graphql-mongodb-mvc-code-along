import { Todo } from "../models/todo.model";
import { ITodo } from "../types/todo";

const getTodos = async () => {
  const todos = await Todo.find()
  console.log(todos)
  return todos
}

const getTodosByUserId = async (id: string) => {
  return await Todo.find({ userId: id })
}

const createTodo = async (data: Omit<ITodo, 'id'>) => {
  const todo = new Todo(data)
  return await todo.save()
}

const updateTodo = async (id: string, data: Partial<ITodo>) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true })
}

const deleteTodo = async (id: string) => {
  return await Todo.findByIdAndDelete(id)
}

export default {
  getTodos,
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo
}