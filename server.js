const express = require('express');
const database = require('./database');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

server.get('/', async function(request, response) {

    const dados = await database.select();
    return response.json(dados);
});

server.post('/', async function(request, response) {

    const modelo = request.body.modelo;
    const fabricante = request.body.fabricante;
    const ano = request.body.ano;

    const result = await database.insert(modelo, fabricante, ano);

    return response.status(204).send()
})

server.put('/', async function(request, response) {

    const id = request.body.id;
    const modelo = request.body.modelo;
    const fabricante = request.body.fabricante;
    const ano = request.body.ano;

    const result = await database.update(id, modelo, fabricante, ano);

    return response.status(204).send()
})

server.delete('/:id', async function(request, response) {
    
    const id = request.params.id;
    
    const result = await database.delete(id);

     return response.status(204).send()
})


server.listen(process.env.PORT || 3000);
