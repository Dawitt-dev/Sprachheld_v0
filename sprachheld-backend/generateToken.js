const jwt = require('jsonwebtoken');
const config = require('config');

const payload = {
    user: {
        id: "61171217-0a4d-471b-8518-70d848a3aa6e"
    }
};

const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });

console.log(token);