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
        return insertUserQuery
    }

    function getVideoUrl(levelId) {
        let getVideoUrlQuery = (`SELECT video_url 
    FROM level_acts WHERE motion = $1`, [level_id])
        return getVideoUrlQuery.rows;
    }



    return {
        greetUser,
        storeUser,
        getVideoUrl
    }
}