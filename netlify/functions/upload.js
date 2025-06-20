// Isi file netlify/functions/upload.js:
const { formidable } = require('formidable');
const { createReadStream } = require('fs');
const pinataSDK = require('@pinata/sdk');

exports.handler = async (event) => {
    // Hanya izinkan method POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    // Ambil kunci API dari Environment Variables yang sudah di-set di Netlify
    const pinata = new pinataSDK({
        pinataApiKey: process.env.PINATA_API_KEY,
        pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY
    });

    try {
        const data = await new Promise((resolve, reject) => {
            // formidable perlu event http mentah untuk bekerja di Netlify
            const form = formidable({});
            form.parse(event, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });

        const file = data.files.file[0];
        if (!file) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Tidak ada file yang ditemukan' })
            };
        }
        
        const options = {
            pinataMetadata: {
                name: file.originalFilename,
            },
        };

        const fileStream = createReadStream(file.filepath);
        const result = await pinata.pinFileToIPFS(fileStream, options);

        // Kirim kembali IPFS Hash (CID) ke front-end
        return {
            statusCode: 200,
            body: JSON.stringify({ ipfsHash: result.IpfsHash })
        };

    } catch (error) {
        console.error('Error di Netlify Function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Gagal meng-upload file ke IPFS' })
        };
    }
};
