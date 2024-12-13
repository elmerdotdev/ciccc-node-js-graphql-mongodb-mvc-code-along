import { User } from "../models/user.model";
import { IUser } from "../types/user";

const getUsers = async () => {
  const users = await User.find()
  return users
}

const getUserById = async (id: string) => {
  return await User.findById(id)
}

const createUser = async (data: Omit<IUser, 'id'>) => {
  const user = new User(data)
  return await user.save()
}

const updateUser = async (id: string, data: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, data, { new: true })
}

const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id)
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}