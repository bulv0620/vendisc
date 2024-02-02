const publicIp = require('public-ip');

exports.getIp = () => {
    return new Promise((resolve, reject) => {
        publicIp.v4().then(ip => {
            resolve(ip)
        });
    })
}