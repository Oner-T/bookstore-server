const { Schema, model } =require("mongoose");

// Create Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Comment = model("comment", CommentSchema);
module.exports = Comment;
