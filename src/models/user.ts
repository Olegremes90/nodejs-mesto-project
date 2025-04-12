import mongoose, {Document} from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import AuthorizedError from "../errors/authorized-err";
export interface IUser extends Document {
  id: number;
  name: string;
  about: string;
  avatar: string;
  password: string;
  email: string;
}
interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<mongoose.Document<unknown, any, IUser>>
}


const userSchema = new mongoose.Schema<IUser >({
  email: {
    type: String,
    required: [true, 'Не передан обязательный параметр - email'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',

    validate: {
      validator: (value: string) => {
        if (value === 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png') return true;
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.ru)(\/[\/\w\-._~:/?#\[\]@!$&'()*+,;=]*)?$/.test(value);
    },
      message: 'Некорректный url для поля avatar',
    },
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user:IUser) => {

      if (!user) {
        return Promise.reject(new AuthorizedError('Неверные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizedError('Неверные почта или пароль'));
          }

          return user;
        });
    });
});


export default mongoose.model<IUser, UserModel>('user ', userSchema);