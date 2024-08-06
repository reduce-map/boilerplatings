exports.post = (req, res) => {
    if (req.session.user) {
        let currentSession = req.session.user;
        req.session.user = undefined;
        res.send(`${currentSession}`);
    } else {
        res.send('session is absent');
    }
}