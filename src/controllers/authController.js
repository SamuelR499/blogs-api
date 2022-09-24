const authService = require('../services/authService');

const auth = async (req, res) => {
    const authToken = await authService.authenticate(req.body);
    return res.status(200).json(authToken);
};

module.exports = {
    auth,
};