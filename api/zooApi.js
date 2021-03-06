module.exports = function(zooFact) {
    
    async function storeUser(req, res) {
        try {
            let name = req.body.name
            let storeUser = await zooFact.storeUser(name);

            res.json({
                status: 'success',
                data: storeUser
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    async function greetUser(req, res) {
        try {
            let name = req.params.name
            let greetUser = await zooFact.greetUser(name);

            res.json({
                status: 'success',
                data: greetUser
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    async function storeUserMotion(req, res) {
        try {
            let motion = req.body.motion
            
            let userMotion = await zooFact.storeUserMotion(motion);

            res.json({
                status: 'success',
                data: userMotion
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    
    return {
        storeUser,
        greetUser,
        storeUserMotion
    }
}