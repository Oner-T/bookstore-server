const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
    },
  },
});

const User = model("user", UserSchema);

module.exports = User;
