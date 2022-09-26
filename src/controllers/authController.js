const authService = require('../services/authService');

const auth = async (req, res, next) => {
try {
    const authToken = await authService.authenticate(req.body);
    return res.status(200).json(authToken);
} catch (error) {
    next(error);
}
};

module.exports = {
    auth,
};