const { Schema, model } =require("mongoose");

// Create Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  subCategories: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = model("category", CategorySchema);
module.exports = Category;
