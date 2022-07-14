const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URL
    ).then(
        (result)=>console.log("Conectado!")
    ).catch(
        (err)=>console.log("Falha ao conectar!")
)
