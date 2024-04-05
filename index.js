const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s9c9pgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbConnection = async () => {
    try {
        await client.connect();
        console.log("Db connection successful");
    } catch (error) {
        console.log(error.name, error.message);
    }
}

dbConnection()

// Browser collection
const userCollection = client.db('bookeepDB').collection('users');
const bookCollection = client.db('bookeepDB').collection('books');
const memberCollection = client.db('bookeepDB').collection('members');
const sectionCollection = client.db('bookeepDB').collection('sections');
const issueCollection = client.db('bookeepDB').collection('issues');
const returnCollection = client.db('bookeepDB').collection('returns');

// API methods
app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    const result = await userCollection.insertOne(newUser)
    res.send(result);
})

app.post('/books', async (req, res) => {
    const newBook = req.body;
    console.log(newBook)
    const result = await bookCollection.insertOne(newBook)
    res.send(result);
})

app.post('/members', async (req, res) => {
    const newMember = req.body;
    console.log(newMember)
    const result = await memberCollection.insertOne(newMember)
    res.send(result);
})

app.post('/sections', async (req, res) => {
    const newSection = req.body;
    console.log(newSection)
    const result = await sectionCollection.insertOne(newSection)
    res.send(result);
})

app.post('/issues', async (req, res) => {
    const newIssue = req.body;
    console.log(newIssue)
    const result = await issueCollection.insertOne(newIssue)
    res.send(result);
})

app.post('/returns', async (req, res) => {
    const newReturn = req.body;
    console.log(newReturn)
    const result = await returnCollection.insertOne(newReturn)
    res.send(result);
})

app.get('/users', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await userCollection.find(query).toArray();
    res.send(result);
})

app.get('/books', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await bookCollection.find(query).toArray();
    res.send(result);
})

app.get('/books/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await bookCollection.findOne(query)
    res.send(result)
})

app.get('/members', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await memberCollection.find(query).toArray();
    res.send(result);
})

app.get('/members/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await memberCollection.findOne(query)
    res.send(result)
})

app.get('/sections', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await sectionCollection.find(query).toArray();
    res.send(result);
})

app.get('/sections/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await sectionCollection.findOne(query)
    res.send(result)
})

app.get('/issues', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await issueCollection.find(query).toArray();
    res.send(result);
})

app.get('/issues/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await issueCollection.findOne(query)
    res.send(result)
})

app.get('/returns', async (req, res) => {
    let query = {};
    if (req.query?.email) {
        query = { email: req.query.email }
    }
    const result = await returnCollection.find(query).toArray();
    res.send(result);
})

app.get('/returns/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await returnCollection.findOne(query)
    res.send(result)
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateUser = req.body;
    console.log(updateUser);
    const user = {
        $set: {
            name: updateUser.name,
            gender: updateUser.gender,
            contact: updateUser.contact,
            image: updateUser.image,
            address: updateUser.address
        }
    };
    const result = await userCollection.updateOne(filter, user, options);

    res.send(result)
})

app.put('/books/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateBook = req.body;
    console.log(updateBook);
    const book = {
        $set: {
            name: updateBook.name,
            category: updateBook.category,
            author: updateBook.author,
            image: updateBook.image,
            price: updateBook.price,
            section: updateBook.section,
            shelf: updateBook.shelf,
            edition: updateBook.edition,
            description: updateBook.description
        }
    };
    const result = await bookCollection.updateOne(filter, book, options);

    res.send(result)
})

app.put('/members/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateMember = req.body;
    console.log(updateMember);
    const member = {
        $set: {
            name: updateMember.name,
            identity: updateMember.identity,
            contact: updateMember.contact,
            join: updateMember.join,
            membership: updateMember.membership,
            account: updateMember.account,
            image: updateMember.image,
            fee: updateMember.fee,
            address: updateMember.address
        }
    };
    const result = await memberCollection.updateOne(filter, member, options);

    res.send(result)
})

app.put('/sections/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateSection = req.body;
    console.log(updateSection);
    const section = {
        $set: {
            name: updateSection.name,
            category: updateSection.category,
            totalBook: updateSection.totalBook,
            totalShelf: updateSection.totalShelf
        }
    };
    const result = await sectionCollection.updateOne(filter, section, options);

    res.send(result)
})

app.put('/issues/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateIssue = req.body;
    console.log(updateIssue);
    const issue = {
        $set: {
            memberName: updateIssue.memberName,
            bookName: updateIssue.bookName,
            category: updateIssue.category,
            author: updateIssue.author,
            section: updateIssue.section,
            shelf: updateIssue.shelf,
            issueDate: updateIssue.issueDate,
            expireDate: updateIssue.expireDate
        }
    };
    const result = await issueCollection.updateOne(filter, issue, options);

    res.send(result)
})

app.put('/returns/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateReturn = req.body;
    console.log(updateReturn);
    const returnBook = {
        $set: {
            memberName: updateReturn.memberName,
            bookName: updateReturn.bookName,
            category: updateReturn.category,
            author: updateReturn.author,
            issueDate: updateReturn.issueDate,
            expireDate: updateReturn.expireDate,
            returnDate: updateReturn.returnDate,
            lateFee: updateReturn.lateFee
        }
    };
    const result = await returnCollection.updateOne(filter, returnBook, options);

    res.send(result)
})

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await bookCollection.deleteOne(query);
    res.send(result);
})


app.delete('/members/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await memberCollection.deleteOne(query);
    res.send(result);
})

app.delete('/sections/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await sectionCollection.deleteOne(query);
    res.send(result);
})

app.delete('/issues/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await issueCollection.deleteOne(query);
    res.send(result);
})

app.delete('/returns/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await returnCollection.deleteOne(query);
    res.send(result);
})

app.get('/', (req, res) => {
    res.send('Welcome to Bookeep Library Management System')
})

app.listen(port, () => {
    console.log(`Bookeep LMS app listening on port ${port}`)
})