const assert = require("assert");
const zooFact = require("../zoo_functions");

const pg = require("pg");
let zoo = zooFact()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/zoo_app_test';
const pool = new Pool({
    connectionString
});
// describe("The zoo App ", function(){
// beforeEach(async function () {
//     await pool.query("delete from ");

// });

describe('The greetUser function', function(){
    it('should be able to greet Chuma', async function(){
        let zoo = zooFact(pool)
        await zoo.storeUser('chuma')
        assert.equal('Hello Chuma !', zoo.greetUser('Chuma'))
    })
});

describe('The storeUser function', function(){
    it('should be able to store the name Yeu into table', async function(){
        let zoo = zooFact(pool)

        await zoo.storeUser('Bantu')
        assert.equal('Bantu', await zoo.storeUser('Bantu')); 
    });

    it('should be able to insert the name Yeu in the table', async function(){
        let zoo = zooFact(pool)
        await zoo.storeUser('Yeu')
        assert.equal('Yeu', await zoo.storeUser('Yeu')); 
    });
});

describe('The getUserId function', function(){
    it('should be able to return Loreen ID', async function(){
        let zoo = zooFact(pool)
        await zoo.storeUser('Loreen')
        assert.equal(1, await zoo.getUserId('Loreen'))
    })
})

// after(function() {
//     pool.end();
// });


// });