const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    desc:{
        type: String,
        required:true,
        trim:true
    },
    completo:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Tasks", taskSchema)