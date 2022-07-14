const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeMessage = (email, nome) =>{
    sgMail.send({
        to: email,
        from: "hisnaidercampello2@gmail.com",
        subject: "Bem vindo!!!",
        text: "testeeeeee",
        html: `<div style="background-color:#198cff;width:100%;height:75px; display: flex;padding-left:10px"><h1 style="color:white">Bem vindo/a ${nome}!</h1></div>`
    }).then(
        (result)=>console.log("Enviado com sucesso!")
    ).catch(
        (err)=>console.log("Algo deu errado!")
    )
}

const goodByeMessage = (email, nome) => {
    sgMail.send({
        to: email,
        from: "hisnaidercampello2@gmail.com",
        subject: "Adeus :(",
        text: `Uma pena não termos atingido suas expectativas ${nome}\nVolte sempre que quiser`
    }).then(
        (result)=>console.log("Enviado com sucesso!")
    ).catch(
        (err)=>console.log("Algo deu errado!")
    )
}

module.exports = {welcomeMessage, goodByeMessage}

