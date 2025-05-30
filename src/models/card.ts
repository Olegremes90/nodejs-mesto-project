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
    ref: 'user ',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user ',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default  mongoose.model<ICard>('card', cardSchema);
