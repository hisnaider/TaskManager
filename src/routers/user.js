const express = require('express');
const multer = require("multer")
const sharp = require('sharp');
const User = require('../models/User')
const Auth = require("../middlewares/authMiddleware")
const {welcomeMessage, goodByeMessage} = require("../email/account")

const router = new express.Router();
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error("Tem que enviar uma imagem"))
        }
        cb(null,true)
    }
})

router.post("/user/login", async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(err){
        res.status(400).send()
    }
})

router.post("/user/logout", Auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {return token.token !== req.token})
        await req.user.save()
        res.send()
    } catch (err){
        res.status(500).send(err)
    }
})

router.post("/user/logoutAll", Auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (err){
        res.status(500).send(err)
    }
})

router.post("/user", async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        welcomeMessage(user.email, user.nome)
        res.status(200).send({user, token})
    }catch(err){
        res.status(400).send(err)
    }
})

router.get("/users/me", Auth, async(req, res) => {
    res.send(req.user)
})

router.patch("/user/me", Auth, async (req, res) => {
    const update = Object.keys(req.body)
    const campos = ["nome", "idade", "email", "password"]
    const isValid = update.every((data)=>campos.includes(data))

    if(!isValid) {
        return res.status(400).send({error: 'invalido'})
    }

    try{
        update.forEach((value)=>req.user[value] = req.body[value])
        await req.user.save()
        res.send(req.user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.delete('/user/me', Auth, async (req, res) => {
    try{
        req.user.remove()
        goodByeMessage(req.user.email, req.user.nome)
        res.send(req.user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post("/user/me/avatar", Auth, upload.single("upload"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize(
        {
            width:100,
            height:100
        }
    ).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next)=>{
    res.status(400).send(error.message)
})

router.delete("/user/me/avatar", Auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})
router.get("/user/:id/avatar", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar){
            throw new Error()
        }

        res.set("Content-Type", "image/png")
        res.send(user.avatar)

    }catch(err){
        res.status(404).send()
    }

})

module.exports = router




// router.get("/user/:id", async (req, res) => {
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if (!user) return res.status(404).send()
//         res.send(user)
//     }catch(err){
//         res.status(500).send(err)
//     }
// })