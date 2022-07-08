const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://Hisnaider:if_be_or_notBe_return_question@taskmenager.btdlrv4.mongodb.net/test"
    ).then(
        (result)=>console.log("Conectado!\n"+result)
    ).catch(
        (err)=>console.log("Falha ao conectar!")
)
