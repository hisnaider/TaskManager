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
    },
    dono:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Users"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Tasks", taskSchema)