const express = require('express');
const userService = require('./userService');

const app = express(); //nome qualquer para express
app.use(express.json()); // vou habilitar json no express

suserService.loadUsers();
userService.getNextId();

app.post("/users", (req, res) =>{
    const {nome, email, endereco, senha, telefone, cpf} = req.body;
    if(!nome || !email || !endereco || !senha || !telefone || !cpf){
        return res.status(400).json
        ({error: "Nome, email, endereço, senha, telefone e CPF são obrigatorios"})
    }
    const user = userService.addUser(nome, email, endereco, senha, telefone, cpf);


    res.status(201).json({user});
});

//rota para listar todos os usuarios
app.get("/users", (req, res) =>{
    res.json(userService.getUsers());
});

const port = 3000;
app.listen(port,() =>{
    console.log("Servidor rodando na porta: ", port);
})


