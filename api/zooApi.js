module.exports = function(zooFact) {
    async function storeUser(req, res) {
        try {
            let name = req.body.name
            let user = await zooFact.storeUser(name);
            res.json({
                status: 'success',
                data: user
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