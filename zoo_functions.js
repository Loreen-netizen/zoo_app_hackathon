module.exports = function zooFact(pool) {

    function greetUser(name) {
        let greet = "Hello " + name + " !";
        console.log({ greet })
        return greet

    }

    function storeUser(name) {
        let insertUserQuery = (`
        INSERT INTO users 
        (user_name) 
        VALUES ($1)`, [name])

    }

    function getUserId(name) {
        let getUserIdQuery = (`SELECT id FROM users WHERE user_name = ($1)`, [name])
        return getUserIdQuery.rows
    }

    function getUserLevel(name) {
        let userId = getUserId(name)
        let getUserLevel = (`SELECT level_act_id FROM progress WHERE user_id = $1`, [userId])
    }

    function getVideoUrl(level_id) {
        let getVideoUrlQuery = (`SELECT video_url 
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