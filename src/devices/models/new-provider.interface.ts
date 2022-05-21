import { Credentials } from 'src/shared/models/credential.type';

export type NewProvider = Credentials & { provider: string };
