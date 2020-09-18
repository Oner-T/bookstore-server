const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

//TicketHeader model

const Category = require("../../models/Category");



//@route    GET api/bugs/all
//@desc     get All Bugs by all users
//@access   Public

router.get("/all", (req, res) => {
    Category.find()
    .sort({ date: -1 })
    .then(cat => res.json(cat))
    .catch(err => res.status(404).json({ err: err }));
});



//@route    GET api/bugs
//@desc     get one Category by id
//@access   Private

router.get("/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send("Please provide valid id");
  }
  var id = mongoose.Types.ObjectId(req.params.id);
  Category.findById({ _id: id })
    .then(cat => {
      res.json(cat);
    })
    .catch(err => res.status(404).json({ err: err }));
});

//@route    POST api/books
//@desc     create a Book
//@access   Private

router.post("/", auth, (req, res) => {
  const { name, author,isbn,favs,purchases,price,pageCount,comments } = req.body;
  if (!name) {
    return res.status(400).json({ baslik: "Name must be valid" });
  }

  if (!author) {
    return res.status(400).json({ icerik: "Author must be valid" });
  }

  const newCategory = new Book({
    name: req.body.name,
    author: req.body.author,
    isbn: req.body.isbn,
    favs: req.body.favs,
    purchases: req.body.purchases,
    price: req.body.price,
    pageCount: req.body.pageCount,
    comments: req.body.comments,
  });

  newCategory
    .save()
    .then(cat => {
      res.json(cat);
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
});

//@route    DELETE api/category/:id
//@desc     delete a category
//@access   Private

router.delete("/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send("Please provide valid id");
  }
  var id = mongoose.Types.ObjectId(req.params.id);
  Category.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ err: err });
    });
});

//@route    PUT api/bugs/:id
//@desc     update a Bug
//@access   Private

router.put("/:id", (req, res) => {
  var conditions = { _id: req.params.id };
  Category.updateOne(conditions, req.body.response)
    .then(cat => {
      res.json(cat);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ err: err });
    });
});

module.exports = router;
