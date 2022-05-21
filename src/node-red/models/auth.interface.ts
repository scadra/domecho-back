export class Auth {
  client_id: string;
  grant_type: string;
  scope: string;
  username: string;
  password: string;

  constructor() {
    this.client_id = 'node-red-admin';
    this.grant_type = 'password';
    this.scope = '*';
    this.username = process.env.NODE_RED_USER;
    this.password = process.env.NODE_RED_PASSWORD;
  }
}
