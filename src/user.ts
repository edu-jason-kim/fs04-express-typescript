import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
});

const User = model<IUser>("User", userSchema);

export const saveUser = async (user: IUser): Promise<IUser> => {
  const { name, email, avatar } = user;
  const newUser = new User({ name, email, avatar });
  const savedUser = await newUser.save();
  return savedUser;
};

export const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};
