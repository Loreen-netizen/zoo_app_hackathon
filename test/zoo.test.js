const assert = require("assert");
const zooFact = require("../zoo_functions");

const pg = require("pg");
let zoo = zooFact()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/zoo_app_test';
const pool = new Pool({
    connectionString
});
describe("The zoo App ", function(){
beforeEach(async function () {
    await pool.query("delete from users");

});

describe('The greetUser function', function(){
    it('should be able to greet Chuma', async function(){
        let zoo = zooFact(pool)
        await zoo.storeUser('chuma')
        assert.equal('Hello Chuma !', await zoo.greetUser('Chuma'))
    })
});

describe('The storeUser function', function(){
    it('should be able to store the name Bantu into table', async function(){
        let zoo = zooFact(pool)

        let user = await zoo.storeUser('Bantu') 
        assert.equal(user, await zoo.storeUser('Bantu')); 
    });

    it('should be able to insert the name Yeu in the table', async function(){
        let zoo = zooFact(pool)
        
        let user = await zoo.storeUser('Yeu') 
        assert.equal(user, await zoo.storeUser('Yeu')); 
    });
});

describe('The getUserId function', function(){
    it('should be able to return Loreen ID', async function(){
        let zoo = zooFact(pool)
        
        await zoo.storeUser('Loreen')
        let id =  await zoo.getUserId('Loreen')
        let userId = await pool.query(`SELECT id FROM users WHERE user_name = 'Loreen'`)
        assert.deepEqual(userId.rows, id)
    })
});

describe('The getUserLevel function', function(){
    it('should be able to return user level', async function(){
    let zoo = zooFact(pool)

    //let user = await zoo.storeUser('Sibo') 
    let user = await pool.query(`SELECT id FROM users WHERE user_name = Loreen`)
    assert.equal(user, await zoo.getUserLevel('1'))
    })
})

after(function() {
    pool.end();
});


});