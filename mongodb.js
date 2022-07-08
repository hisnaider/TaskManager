const {MongoClient, ObjectID} = require('mongodb')

const URL = "mongodb://127.0.0.1:27017"
const databaseName = "TaskManager"

MongoClient.connect(URL,(error,client) =>{
    if (error){
        return console.log("Não foi possivel conectar!\n"+error)
    }
    const db = client.db(databaseName)

    // db.collection("users").insertOne({
    //     nome: "Hisnaider Campello",
    //     idade: 24
    // },(error, result) => {
    //     if (error) return console.log("Não foi possivel salvar! "+error)
    //     console.log(result)
    // })
    // console.log("Done!")

    // db.collection("users").insertMany([
    //     {
    //         name:"seila",
    //         idade: 25
    //     },
    //     {
    //         name: "nsei",
    //         idade: 45
    //     }
    // ], (error, result) => {
    //     if (error) return console.error("Não foi possivel salvar! "+error)
    //     console.log(result)
    // })

    // db.collection("task").insertMany([
    //     {
    //         desc: "Fazer alguma coisa",
    //         completo: true
    //     },
    //     {
    //         desc: "Fazer outra coisa",
    //         completo: false
    //     },
    //     {
    //         desc: "Fazer todas coisa",
    //         completo: false
    //     }
    // ], (error, result) => {
    //     if (error) return console.log("Não foi possivel salvar! "+error)
    //     console.log(result)
    // })
    // db.collection("task").findOne({_id: new ObjectID("62c434867e93c421d41a23a6")}).then((result) =>console.log(result)).catch((error) =>console.log(error))
    // db.collection("task").find({completo:false}).toArray().then((result) =>console.log(result)).catch((error))
    // db.collection("task").updateMany(
    //     {
    //         completo:false,
    //     },
    //     {
    //         $set:{completo:true}
    //     }
    // ).then((result) =>console.log(result)).catch((error))
    db.collection("task").deleteOne({desc:"Fazer outra coisa"}).then((result) =>console.log(result)).catch((error))
    console.log("Done!")
})