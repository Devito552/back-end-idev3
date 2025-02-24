const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json'); //caminho do arquivo
        this.users = []; //Array para armazenar user
        this.nextId = 1; //contador para gerar id
    }

    loadUsers() {
        try { //tenta executar o bloco de codigo
            if (fs.existsSync(this.filePath)) { //verifica se o arquivo existe
                const data = fs.readFileSync(this.filePath); //le o arquivo
                return JSON.parse(data); //transforma o json em objeto
            }
        } catch (erro) { //caso ocorra um erro
            console.log('Erro ao carregar arquivo', erro);
        }
        return []; //retorna um array vazio
    }

    //difinir o proximo id a ser utilizado
    getNextId() {
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;//retorna o maior id +1
        } catch (erro) {
            console.log('Erro ao buscar proximo id', erro);
        }
    }

    addUser(nome, email) {
        const user = new User(this.nextId++, nome, email);
        this.users.push(user);
        return user;
    }

    getUsers() {
        return this.users
    }

}

module.exports = new userService;