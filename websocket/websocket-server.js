const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({port: 3003});
let messagesHistoriques = [];
webSocketServer.on('connection', webSocket => {
    webSocket.send(JSON.stringify(messagesHistoriques));
    webSocket.onmessage = messageEvent => {
        messagesHistoriques.push(messageEvent.data);
        const message = messageEvent.data;
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
});

module.exports = webSocketServer;
