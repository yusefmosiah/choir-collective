import { EventEmitter } from 'events';

class MockWebSocket extends EventEmitter {
  readyState = WebSocket.OPEN;

  constructor(url: string) {
    super();
    setTimeout(() => this.emit('open'), 100);
  }

  send(data: string) {
    const message = JSON.parse(data);
    setTimeout(() => {
      this.emit('message', JSON.stringify({
        type: 'message',
        payload: {
          ...message.payload,
          id: Date.now().toString(),
          author: 'Server',
          timestamp: new Date(),
        },
      }));
    }, 500);
  }

  close() {
    this.emit('close');
  }
}

export default MockWebSocket;
