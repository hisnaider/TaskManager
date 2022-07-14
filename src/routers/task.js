const express = require('express');
const Task = require('../models/Task')
const Auth = require("../middlewares/authMiddleware")

const router = new express.Router();

router.post("/tasks", Auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        dono: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get("/tasks", Auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completo) match.completo = req.query.completo === "true"
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }
    await req.user.populate([{
        path:"tasks", 
        match,
        options: {
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
    }]).then((result) => 
        res.status(200).send(result.tasks)
    ).catch(
        (err) =>res.status(500).send()
    )
    // try{
    //     const tasks = await Task.find({dono:req.user._id})
    //     res.status(200).send(tasks)
    // }catch(err){
    //     res.status(500).send()
    // }
})

router.get("/task/:id", Auth, async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, dono:req.user._id})
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    }catch(err){
        res.status(500).send(err)
    }
})

router.patch("/task/:id", Auth, async (req, res) => {
    const _id = req.params.id
    const update = Object.keys(req.body)
    const campos = ["desc", "completo"]
    const isValid = update.every((data)=>campos.includes(data))

    if(!isValid) {
        return res.status(400).send({error: 'invalido'})
    }

    try{
        const task = await Task.findOne({_id, dono:req.user._id})
        if(!task) return res.status(404).send()
        update.forEach((value)=>task[value] = req.body[value])
        await task.save()
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete("/task/:id", Auth, async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id, dono:req.user._id})
        if(!task) return res.status(404).send("Tarefa não existe!")
        res.send(task)
    }catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router