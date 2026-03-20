const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// ROTA RAIZ
app.get("/", (req, res) => {
  res.send("API está funcionando 🚀");
});

// GET
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
  const newTask = {
    id: id++,
    text: req.body.text,
    date: req.body.date || "",
    priority: req.body.priority || "baixa",
    completed: false
  };

  tasks.push(newTask);
  res.json(newTask);
});

// PUT
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.completed = req.body.completed;
    res.json(task);
  } else {
    res.status(404).send("Not found");
  }
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

// DELETE ALL
app.delete("/tasks", (req, res) => {
  tasks = [];
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});