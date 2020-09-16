import { Schema, model } from "mongoose";

// Create Schema
const PurchaseSchema = new Schema({
  books: [{
    type: Schema.Types.ObjectId,
    ref: "Book",
  }],
  price:{
      type:Number,
      required:true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const Purchase = model("purchase", PurchaseSchema);

export default Purchase;
