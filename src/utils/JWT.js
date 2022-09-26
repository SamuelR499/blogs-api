const jwt = require('jsonwebtoken');

const TOKEN_SECRET_KEY = process.env.JWT_SECRET || 'fecheOsOlhosSenhaForte';

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

module.exports = {
    generateToken,
};