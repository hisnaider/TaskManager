require("../dp/mongoose")
const User = require("../models/User")
const Task = require("../models/Task")

// User.findByIdAndUpdate("62c6e505babbf36607cc8ba8",{idade:1}).then((result)=>{
//     console.log(result)
//     return User.countDocuments({idade:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })

Task.findByIdAndDelete("62c65b6dc7b64204e47e8580").then((result)=>{
    console.log(result)
    return Task.find({completo:false})
}).then((result)=>{
    console.log("------------------------------------------------")
    console.log(result)
}).catch((err)=>{
    console.log(err)
})