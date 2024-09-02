const crypto = require('crypto');

export default async function mainHandler(req, res) {
    const randomBytes = crypto.randomBytes(128);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        message: 'Hello World',
        query: req.query,
        body: req.body,
        cookies: req.cookies,
        randomBytes: Array.from(randomBytes)
    }));
}

