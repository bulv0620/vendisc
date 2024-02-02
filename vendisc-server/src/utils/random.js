exports.randomPwd = (num = 6) => {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = chars.length;

    let code = '';
    for (let i = 0; i < num; i++) {
        code += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return code
} 