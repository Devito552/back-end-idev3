const User = require("./user");
const path = require('path'); //modulo para manipular caminhos
const fs = require('fs'); //modulo para manipular arquivos file system

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json'); //caminho do arquivo
        this.users = this.loadUsers(); //Array para armazenar user
        this.nextId = this.getNextId(); //contador para gerar id
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
    getNextId() {//função para buscar o proximo id
        try {
            if (this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;//retorna o maior id +1
        } catch (erro) {
            console.log('Erro ao buscar proximo id', erro);
        }
    }

    saveUsers() { //função para salvar os usuarios
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users)); //salva o arquivo
        } catch (erro) {
            console.log('Erro ao salvar arquivo', erro);
        }
    }

    addUser(nome, email) { //função para adicionar usuario
        try {
            const user = new User(this.nextId++, nome, email);
            this.users.push(user);//adiciona o usuario no array
            this.saveUsers();//salva o usuario
            return user;
        } catch (erro) {
            console.log('Erro ao adicionar usuario', erro);
        }
    }

    getUsers() { //função para buscar usuarios
        try {
            return this.users
        } catch (erro) {
            console.log('Erro ao buscar usuarios', erro);
        }
    }

}

module.exports = new userService;