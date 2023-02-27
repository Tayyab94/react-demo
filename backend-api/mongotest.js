const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors= require("cors");

const app = express();
app.use(cors())
app.use(express.json());
require('./swagger')(app)

const port = 1003;
const url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const dataBaseName = "mydatabase";
const productCollection = "products";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};

const client = new MongoClient(url, options);

const Db_Connection = async () => {
    var result = await client.connect();

    let db = result.db(dataBaseName);

    return db;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 * 
 * /api/book:
 *   get:
 *     summary: Retrieves a list of all books
 *     description: Use this API to retrieve a list of all books from MongoDB
 *     responses:
 *       '200':
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

app.get("/api/book", async (req, res) => {
    var database = await Db_Connection();

    let data = await database.collection('books').find({}).toArray();
    if (!data) res.status(404).json("No data found")
    res.status(200).json(data)
})

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Get a Single Book by ID
 *     description: Retrieve a single book from the MongoDB database by providing the book ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the book to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Returns the requested book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Not Found. No book found with the provided ID.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 */

app.get("/api/book/:id", async (req, res) => {
    var database = await Db_Connection();
    try {
        let data = await database.collection('books').findOne({ _id: new ObjectId(req.params.id) });
        if (!data) {
            return res.status(404).json({ message: "No book found with the specified ID" });
        }
        else {
            return res.status(200).send(data);
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Booknew:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 * 
 * /api/book/addbook:
 *   post:
 *     summary: Add a new book to the database
 *     description: Use this API to add a new book to the MongoDB database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booknew'
 *     responses:
 *       '201':
 *         description: The newly created book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

app.post("/api/book/addbook", async (req, res) => {
    var database = await Db_Connection();

    let book = {
        "name": req.body.name
    }

    let resu = await database.collection('books').insertOne(book)
    
    if (resu.acknowledged) {
       return res.status(201).json(book);
    }
    //     let data =await database.collection('books').findOne({_id:new  ObjectId(req.params.id)});
    //    if(!data) res.status(404).json("No data found")
    //     res.send(data);
})

// /**
//  * @swagger
//  * /api/book/{id}:
//  *   put:
//  *     summary: Update the book by ID
//  *     description: Update the book into the mongodb by providing the ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         description: The ID of the book to update
//  *         required: true
//  *         schema:
//  *           type: string
//  *       - in: requestBody
//  *         name: book
//  *         description: The updated book object
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             book:
//  *               type: object
//  *               properties:
//  *                 name:
//  *                  type: string
//  *     responses:
//  *       '201':
//  *         description: Created, return the book object
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Book'
//  *       '404':
//  *         description: No book found with the provided ID
//  *       '500':
//  *         description: Server error
//  */

/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Update the book by ID
 *     description: Update the book in the MongoDB by providing the ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated book object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBook'
 *     responses:
 *       '201':
 *         description: Created, return the book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: No book found with the provided ID
 *       '500':
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *     UpdateBook:
 *       type: object
 *       properties:
 *         book:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 */


app.put("/api/book/:id", async (req, res) => {
    var database = await Db_Connection();

    const {name}= req.body.book ||{}
    let book = {
        "name": name
    }       
    let resu = await database.collection('books')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: { "name":req.body.book.name} })
 
    if (resu.acknowledged) {
       return res.status(201).json(book);
    }
})

/**
 * @swagger
 * components:
 *  schemas:
 *    deleteBook:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        name:
 *          type: string
 * 
 * /api/book/{id}:
 *  delete:
 *      summary: Delete the Record By Id
 *      description: Delete the book from the Database
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the Book to delete
 *           required: true
 *           schema:
 *             type: string
 *      responses:
 *       200:
 *          description: Recor has been deleted
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                            type: string  
 *       404:
 *          description: No Record Found
 *       500:
 *          description: Server error
 */


app.delete("/api/book/:id", async (req, res) => {
    var database = await Db_Connection();
    let resu = await database.collection('books').deleteOne({ _id: new ObjectId(req.params.id) })
    console.warn(resu)
    if (resu.acknowledged) {
       return res.status(200).json({message: "Recor has been deleted"});
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
