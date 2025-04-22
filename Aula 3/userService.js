const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system
const bcrypt = require('bcryptjs'); //modulo para criptografar senha
const mysql = require("./mysql"); // importando funções de conexao com o MySQL

class userService {
    async addUser(nome, email, senha, endereco, telefone, cpf) { //função para adicionar usuario
        try {
            const senhaCripto = await bcrypt.hash(senha, 10);
            const resultados = await mysql.execute(
                `INSERT INTO usuarios (nome, email, senha, endereco, telefone, cpf)
                      VALUES (?, ?, ?, ?, ?, ?);`,
                      [nome, email, senhaCripto, endereco, telefone, cpf]
            );
            return resultados;
        } catch (erro) {
            console.log('Erro ao adicionar usuario', erro);
            throw erro;
        }
    }

    async getUser(id) { //função para buscar usuarios
        try {
            const resultado = await mysql.execute(
                `SELECT idusuario FROM usuarios WHERE idusuario = ?`, 
                [id]
            );
            console.log("resultado ", resultado);
            return resultado;
        } catch (erro) {
            console.log('Erro ao buscar usuarios', erro);
        }
    }

    async deleteUser(id) {
        try {
            const user = await this.getUser(id);
            if (user.length == 0) {
                console.log("Usuario não existe!");
                return;
            }
            const resultado = await mysql.execute(
              `DELETE FROM usuarios WHERE idusuario = ?`,
              [id]
            );
            return resultado;
        } catch (erro) {
            console.log('Erro ao deletar usuario', erro);
        }
    }

    async updateUser(id, nome, email, endereco, senha, telefone, cpf) {
        try {

            
            const senhaCripto = await bcrypt.hash(senha, 10);
            user.nome = nome;
            user.email = email;
            user.senha = senhaCripto;
            user.endereco = endereco;
            user.telefone = telefone;
            user.cpf = cpf;
            this.saveUsers();
            return user;
        } catch (erro) {
            console.log('Erro ao atualizar usuario', erro);
            throw erro;
        }
    }

}

module.exports = new userService;