import mongoose, { Document, Schema } from 'mongoose';
interface ICard extends Document {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}
// Определение схемы карточки
const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user ', // Ссылка на модель автора карточки
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [], // По умолчанию пустой массив
    ref: 'user ', // Ссылка на модель пользователей, которые лайкнули карточку
  },
  createdAt: {
    type: Date,
    default: Date.now, // Значение по умолчанию - текущее время
  },
});
// Создание модели карточки

export default  mongoose.model<ICard>('card', cardSchema);
