import mongoose from "mongoose";
export interface IUser {
  id: number;
  name: string;
  about: string;
  avatar: string;
}
// Опишем схему:
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  }
});
export default mongoose.model<IUser>('user', userSchema);