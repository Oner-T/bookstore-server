import { Schema, model } from "mongoose";

// Create Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
    },
  ],
  cart: {
    Books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
});

const User = model("user", UserSchema);

export default User;
