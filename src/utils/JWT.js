const jwt = require('jsonwebtoken');

const TOKEN_SECRET_KEY = process.env.JWT_SECRET || 'fecheOsOlhosSenhaForte';
const errorGenerate = require('./genericErrorHanlder');

const generateToken = ({ id, displayName }) => {
    const payload = {
        id,
        displayName,
    };

    const jwtConfig = {
        expiresIn: '999years',
        algorithm: 'HS256',
    };

    const token = jwt.sign(payload, TOKEN_SECRET_KEY, jwtConfig);

    return token;
};

const authenticateToken = async (token) => {
    if (!token) {
        throw errorGenerate(401, 'Token not found');
    }

    try {
        const validateToken = jwt.verify(token, TOKEN_SECRET_KEY);
        console.log('verify >_ ', validateToken);
        return validateToken;
    } catch (error) {
        throw errorGenerate(401, 'Expired or invalid token');
    }
};

module.exports = {
    generateToken,
    authenticateToken,
};