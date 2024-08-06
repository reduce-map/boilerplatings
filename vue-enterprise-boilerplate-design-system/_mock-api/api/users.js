module.exports = app => {
    app.get('/api/users/:username', (request, response) => {
        response.json({ hello: 12345 })
    })
}
