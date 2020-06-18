const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'eypyxnjysfeebp',
    password: '514bb1002477cf2d0ca195310a7444c1462cb4d6218dbdc42d954a1313b77d32',
    host: 'ec2-3-231-16-122.compute-1.amazonaws.com',
    database: 'd16rtmmugti3pp',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sqlCreate = `
    CREATE TABLE IF NOT EXISTS carros
    (
        id serial primary key,
        modelo varchar(50) not null,
        fabricante varchar(50) not null,
        ano int not null 
    )
`;

pool.query( sqlCreate , function(error, result) {
    if(error)
    throw error

    console.log("Tabela criada com sucesso")
});

module.exports = {

    async  insert(modelo, fabricante, ano){

        const sql = `INSERT INTO carro (modelo, fabricante, ano)
                VALUES ($1, $2, $3)`;
        
        const result = await pool.query(sql, [modelo, fabricante, ano]);

        return result.rowCount;
    },

    async  select(){
        const sql = `SELECT * FROM carros`;
        
        const result = await pool.query(sql);

        return result.rows;
    },

      async  delete(id){

        const sql = `DELETE FROM carros WHERE id = $1`;
        
        const result = await pool.query(sql, [id]);

        return result.rowCount;
    },

    async  update(id, modelo, fabricante, ano){

        const sql = `UPDATE carros
        SET modelo = $2, fabricante = $3, ano = $4
        WHERE id = $1`;
        

        const result = await pool.query(sql, [id, modelo, fabricante, ano]);

        return result.rowCount;
    },

    
}