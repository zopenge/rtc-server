const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const port = process.env.PORT || 3000;

// 创建一个 WebSocket 服务器
const wss = new WebSocketServer({ noServer: true });

// 处理 WebSocket 连接
wss.on('connection', (ws) => {
    console.log('Client connected');

    // 处理消息
    ws.on('message', (message) => {
        console.log('Received:', message);
        // 将消息广播给所有连接的客户端
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// 配置 Express 服务器
app.use(express.static('public'));

// 处理 WebSocket 升级请求
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
