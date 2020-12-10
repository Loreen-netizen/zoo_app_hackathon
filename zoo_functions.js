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

    async function storeUserMotion(motion) {
        console.log({motion}, ' storeUserMotion');
        
        try {


            const findMotionForUSerSQL = `select count(*) from progress where user_id = $1 and motion_status = $2`;

            const results = await pool.query(findMotionForUSerSQL, [1, motion]);
            console.log(results.rows)
            if (results.rows[0].count == 0) {
                    let storeUserMotionQuery = await pool.query(`INSERT INTO progress(user_id, motion_status, level_act_id ) 
        VALUES ($1, $2, $3)`, [1, motion, 1]);
                return storeUserMotionQuery.rows;

            } else {
                // update the motion count with 1
            }

            


        } catch (error) {
            console.log(error);
            return error
            
        }

    }

    // async function getVideoUrl(level_id) {
    //     let getVideoUrlQuery = await pool.query(`SELECT video_url 
    // FROM level_acts WHERE motion = $1`, [level_id])
    //     return getVideoUrlQuery.rows;
    // }



    return {
        greetUser,
        storeUser,
        getUserId,
        // getVideoUrl,
        getUserLevel,
        storeUserMotion,
    }
}