module.exports = function (zooFact){
    async function storeUser(req, res) {
        try {
            let user = await zooFact.storeUser();
            res.json({
                status: 'success',
                data: user
            });
        }
        catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };
    return{
        storeUser
    }
}
