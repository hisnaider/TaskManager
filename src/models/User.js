const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    nome:{
        required: true,
        type: String,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("Email invalido!")
        }
        
    },
    password:{
        type:String,
        required:true,
        minLength: 6,
        trim:true,
        validate(value){
            if(value.includes("password")) throw new Error("Senha invalida!")
        }

    },
    idade:{
        default:0,
        type:Number,
        validate(value){
            if(value < 0) throw new Error("idade deve ser maior que 0 !")
        }
    }
})

module.exports = mongoose.model("Users", userSchema)