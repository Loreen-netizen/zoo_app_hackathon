axios
    .get('/api/user')
    .then(function(results) {
    user.innerHTML = userTemplate({
            name: results.data.data
        });
    });