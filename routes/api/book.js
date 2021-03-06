const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

//TicketHeader model

const Book = require("../../models/Book");

//@route    GET api/bugs
//@desc     get All Bugs by current user
//@access   Private

router.get("/", auth, (req, res) => {
  res.set("Authorization", res.locals.token);
  Book.find()
    .sort({ date: -1 })
    .then(bugs => {
      res.json(bugs.filter(bug => bug.userId == res.locals.userId));
    })
    .catch(err => res.status(404).json({ err: err }));
});

//@route    GET api/bugs/all
//@desc     get All Bugs by all users
//@access   Public

router.get("/all", (req, res) => {
    Book.find()
    .sort({ date: -1 })
    .then(bugs => res.json(bugs))
    .catch(err => res.status(404).json({ err: err }));
});

//@route    GET api/bugs/all/:id
//@desc     get All Bugs by one user
//@access   Public

router.get("/all/:id", (req, res) => {
    Book.find()
    .sort({ date: -1 })
    .then(bugs => res.json(bugs))
    .catch(err => res.status(404).json({ err: err }));
});

//@route    GET api/bugs
//@desc     get one Bug by id
//@access   Private

router.get("/:id", auth, (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send("Please provide valid id");
  }
  var id = mongoose.Types.ObjectId(req.params.id);
  Book.findById({ _id: id })
    .then(book => {
      res.json(book);
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

  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    isbn: req.body.isbn,
    favs: req.body.favs,
    purchases: req.body.purchases,
    price: req.body.price,
    pageCount: req.body.pageCount,
    comments: req.body.comments,
  });

  newBook
    .save()
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
});

//@route    DELETE api/bugs/:id
//@desc     delete a Bug
//@access   Private

router.delete("/:id", auth, (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.send("Please provide valid id");
  }
  var id = mongoose.Types.ObjectId(req.params.id);
  Book.deleteOne({ _id: id })
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

router.put("/:id", auth, (req, res) => {
  var conditions = { _id: req.params.id };
  Book.updateOne(conditions, req.body.response)
    .then(book => {
      res.json(book);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ err: err });
    });
});

module.exports = router;
