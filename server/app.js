const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("todo", todoSchema);

app.get("/todos", (req, res) => {
  Todo.find().then((todo) => res.json(todo));
});

app.post("/todos", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
  });
  newTodo.save().then((todo) => res.json(todo));
});

app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id).then(() => res.json({ remove: true }));
});

app.patch("/todo/completed/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, { completed: true }).then(() =>
    res.json({ update: true })
  );
});

app.patch("/todo/incompleted/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, { completed: false }).then(() =>
    res.json({ update: true })
  );
});

app.listen(5000, () => {
  console.log("server is running at port 5000");
});
