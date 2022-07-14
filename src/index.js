const express = require('express');
require("./dp/mongoose")

const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=> {
    console.log("Express conectado! Porta: "+port)
})

// const bcrypt = require("bcryptjs")

// const teste = async () =>{
//     const password = "merda3000"
//     const hashpassword = await bcrypt.hash(password, 8)
//     const isMatch = await bcrypt.compare("merda3000", hashpassword)
//     console.log(`${password}\n${hashpassword}\n${isMatch}`)
// }

// const jwt = require("jsonwebtoken")

// const teste = async() =>{
//     const token = jwt.sign({id:123, seila:456}, "teste", {expiresIn: "1 seconds"})
//     console.log(token)
//     const info = jwt.verify(token, "teste")
//     console.log(info)
// }

// teste()

// const Task = require('./models/Task')
// const User = require('./models/User')

// const teste = async() =>{
//     // const task = Task.findById("62cd77e20ed94b05a5e528eb")
//     // task.populate(["dono"]).then((result) =>console.log(result.dono)).catch((err) =>console.log(err))

//     const user = User.findById("62cd5b523ba0c7e978da24ed")
//     user.populate(["tasks"]).then((result) => console.log(result.tasks)).catch((err) =>console.log(err))
// }

// teste()