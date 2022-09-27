const { authenticateToken } = require('../utils/JWT');
const errorGenerate = require('../utils/genericErrorHanlder');

const authMiddleware = async (req, _res, next) => {
    try {
        const { authorization } = req.headers;

        const user = await authenticateToken(authorization);

        if (!user) {
            throw errorGenerate(401, 'Expired or invalid token');
        }
        req.locals = user;
        next();
    } catch (error) {
        next(error);
}
};

module.exports = authMiddleware;