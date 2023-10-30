const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');


require('dotenv').config();

const db_link = process.env.DATABASE_URL;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

const bookRouter = express.Router();

bookRouter
  .route("/") 
  .get(getAllBooks)
  .post(addBook);

bookRouter
  .route("/:id")
  .get(getBookByID)
  .patch(updateBookByID)
  .delete(deleteBookByID);

async function addBook(req, res) {
    try {
        const { title, author, summary } = req.body;
        const randomBookId = generateRandomBookId();
        const newBook = new Book({ book_id: randomBookId, title, author, summary });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAllBooks(req, res) {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send(error);
    }
}


async function getBookByID(req, res) {
    const bookId = req.params.id;
    try {
        const book = await Book.findOne({ book_id: bookId });

        if (!book) {
            res.status(404).send("Book not found");
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}



async function updateBookByID(req, res) {
    const bookId = req.params.id;
    const updateData = req.body;
    try {
        const book = await Book.findOneAndUpdate({ book_id: bookId }, updateData, { new: true });

        if (!book) {
            res.status(404).send("Book not found");
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


async function deleteBookByID(req, res) {
    const bookId = req.params.id;
    try {
        const book = await Book.findOneAndRemove({ book_id: bookId });
        
        if (!book) {
            res.status(404).send("Book not found");
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


function generateRandomBookId() {
    const randomString = Math.random().toString(36).substring(7);
    const randomNumber = Math.floor(Math.random() * 1000);
    return randomString + randomNumber;
}

app.use('/books', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
