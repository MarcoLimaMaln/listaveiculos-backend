const express = require('express');

const server = express();

server.use(express.json());

const carros = [
    {modelo: 'Gol', fabricante: 'Volkswagen', ano: 2000},
    {modelo: 'Saveiro', fabricante: 'Volkswagen', ano: 2000}
]

server.get('/carro', function(request, response) {
    response.json(carros);
})

server.post('/carro', function(request, response) {
    //const modelo = request.body.modelo;
    //const fabricante = request.body.fabricante;
    //const ano = request.body.ano;

    const {modelo, fabricante, ano} = request.body;

    carros.push({modelo, fabricante, ano});
    response.status(204).send();
})

server.put('/carro/:id', function(request, response){
    
    const { id } = request.params;
    const {modelo, fabricante, ano} = request.body;

    for(let i = 0; i < carros.length; i++){
        if(carros[i].modelo == id){
            carros[i].modelo = modelo;
            carros[i].fabricante = fabricante;
            carros[i].ano = ano;
            break;
        }
    }
    return response.status(204).send();
})

server.delete('/carro/:id', function(request, response){
    const {id} = request.params;
    const {modelo, fabricante, ano} = request.body;


    for (let i = 0; i < carros.lenght; i++){
            if(carros[i].modelo == id){
                carros.splice(i, 1);
                break;
            }
        }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);