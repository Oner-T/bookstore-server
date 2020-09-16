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
  purchases:[{

  }],
  cart
});

const User = model("user", UserSchema);

export default User;
