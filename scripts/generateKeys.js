// scripts/generateKeys.js
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    // Save keys to files
    fs.writeFileSync(path.join(__dirname, 'publicKey.pem'), publicKey);
    fs.writeFileSync(path.join(__dirname, 'privateKey.pem'), privateKey);

    console.log('Keys generated and saved to publicKey.pem and privateKey.pem');
};

generateKeys();
