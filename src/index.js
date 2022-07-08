const express = require('express');
require("./dp/mongoose")
const User = require("./models/User")
const Task = require("./models/Task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


//users
app.post("/users", (req, res) => {
    const user = new User(req.body)
    user.save().then(() =>{
        res.send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get("/users",(req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send()
    })
})

app.get("/user/:id",(req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) return res.status(404).send()
        res.send(user)
    }).catch((err) => {
        res.status(500).send()
    })
})


//tasks
app.post("/tasks", (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get("/tasks",(req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((err) => {
        res.status(500).send()
    })
})

app.get("/task/:id",(req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) return res.status(404).send()
        res.send(task)
    }).catch((err) => {
        res.status(500).send()
    })
})




app.listen(port, ()=> {
    console.log("Express conectado! Porta: "+port)
})