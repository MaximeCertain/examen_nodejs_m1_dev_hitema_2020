const crypto = require('crypto');
const HttpStatus = require('http-status-codes');

function sha1Encode(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

module.exports.digestAuth = (request, response, next) => {
    const authorization = request.headers.authorization;
    const encoded = authorization.replace('Basic', '');
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const authentication = decoded.split(':');
    const hashedPassword = sha1Encode("password");
    const isValid = authentication[0] === "node" && authentication[1] === hashedPassword;

    if (isValid) {
        return next();
    } else {
        response.sendStatus(HttpStatus.UNAUTHORIZED);
    }
};