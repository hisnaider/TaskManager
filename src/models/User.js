const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./Task")

const userSchema = new mongoose.Schema({
    nome:{
        required: true,
        type: String,
        trim:true
    },
    email:{
        type: String,
        unique: true,
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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps:true
})

userSchema.virtual("tasks",{
    ref:"Tasks",
    localField:"_id",
    foreignField:"dono"
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) throw new Error("Não foi possivel logar1")
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(password)
    if (!isMatch) throw new Error("Não foi possivel logar2")
    return user
}

userSchema.pre("save", async function(next){
    const user = this
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre("remove", async function(next){
    const user = this
    await Task.deleteMany({dono:user._id})
    next()
})

const User = mongoose.model("Users", userSchema)

module.exports = User