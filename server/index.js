import express from 'express';
import db from "./db.js";
import cors from "cors"

const app = express();
const port = 3000;

// MIDDLEWARE //
// app.use(bodyParser.urlencoded({ extended: true })); - allowing access to req.body and then to do it in json:
// express.json() handles JSON data (typically used in APIs). / parse incoming JSON data from HTTP requests
// bodyParser.urlencoded() handles URL-encoded form data (used in traditional form submissions).
// and also we didnt really use body-parser(?) simply req.body and it wokred like a charm! 

app.use(express.json());
app.use(cors({ origin: 'https://pern-todo-two.vercel.app/' }))
db.connect();


//ROUTES//

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const description = req.body.description;
        const newTodo = await db.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]) // res.json(newTodo) is used to send a JSON response back to the client
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "An error occurred" });

    }
})

// get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodo = await db.query("SELECT * FROM todo")
        res.json(allTodo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

// get a todo 

app.get("/todos/:id", async (req,res)=>{
    try {
        // console.log(req.params)
        const id = req.params.id
        const todo = await db.query("SELECT * FROM todo WHERE todo_id=$1",[id])

        res.json(todo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

// update a todo

app.put("/todos/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const description = req.body.description;

        const updateTodo = await db.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("Todo was updated!")
    } catch (err) {
        console.log(err.message)
    }
})

// delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("Todo was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(port, () => {
    console.log("Server running on port: " + port)
})