const express = require('express');

const app = express();

export default async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        message: 'Hello World 2',
        query: req.query,
        body: req.body,
        cookies: req.cookies
    }));
};

