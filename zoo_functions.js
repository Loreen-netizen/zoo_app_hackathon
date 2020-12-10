module.exports = function zooFact(pool) {

    async function greetUser(name) {
        let greet = "Hello " + name + " !";
        console.log({ greet })
        return greet
    }

    async function storeUser(name) {

        let insertUserQuery = `INSERT INTO users (user_name) VALUES ($1)`;
        await pool.query(insertUserQuery, [name])

    }

    async function getUserId(name) {
        let getUserIdQuery = await pool.query(`SELECT id FROM users WHERE user_name = ($1)`, [name])
        return getUserIdQuery.rows
    }

    async function getUserLevel(name) {
        let userId = getUserId(name)
        let getUserLevel = await pool.query(`SELECT level_act_id FROM progress WHERE user_id = $1`, [userId])
        return getUserLevel

    }

    async function getVideoUrl(level_id) {
        let getVideoUrlQuery = await pool.query(`SELECT video_url 
    FROM level_acts WHERE motion = $1`, [level_id])
        return getVideoUrlQuery.rows;
    }



    return {
        greetUser,
        storeUser,
        getUserId,
        getVideoUrl,
        getUserLevel
    }
}