import nats, { Stan } from 'node-nats-streaming';

class NatsWarrper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Connect access nats before initializing it');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected NATS!');
        resolve();
      });
      this._client!.on('error', (err) => {
        reject(err);
      });
    });
  }
}

const natsWrapper = new NatsWarrper();

export { natsWrapper };
