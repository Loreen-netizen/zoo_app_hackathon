module.exports = function(zooFact) {
    async function storeUser(req, res) {
        try {
            let name = req.body.name
            let storeUser = await zooFact.storeUser(name);
            let greetUser = await zooFact.greetUser(name)
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
    return {
        storeUser
    }
}