// database.js

const sqlite3 = require('sqlite3').verbose()

// cria o banco de dados
const db = new sqlite3.Database(':memory:')

// cria a tabela
db.serialize(() => {
  db.run('CREATE TABLE formulario (	id INTEGER PRIMARY KEY AUTOINCREMENT,  nome TEXT NOT NULL,  email TEXT NOT NULL,  e-mail TEXT NOT NULL,  telefone text)')
  })

// insere alguns dados
db.serialize(() => {
  db.run('INSERT INTO users (name) VALUES (?)', ['João'])
  db.run('INSERT INTO users (name) VALUES (?)', ['Maria'])
})

module.exports = db
