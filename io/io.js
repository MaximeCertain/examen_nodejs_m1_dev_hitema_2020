const fs = require('fs');

module.exports.decodeHexFileContent = (filePath) =>  {

    return new Promise((resolve, reject) => {
        let stream = fs.createReadStream(filePath);
        stream.on("data", function(data) {
            let chunk = data.toString();
            const convert = (from, to) => str => Buffer.from(str, from).toString(to)
            const hexToUtf8 = convert('hex', 'utf8');
            let x = hexToUtf8(chunk);
            resolve(x);
        });
        stream.on("error", function(data) {
           reject(data);
        });
    });
};
