const { Schema, model } =require("mongoose");

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  favs: {
    type: Number,
  },
  purchases: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Book = model("book", BookSchema);

module.exports= Book;
