export interface TeslaAccount {
  _id?: string;
  token_created_at?: number;
  token_expires_in?: number;
  refresh_token?: string;
  access_token?: string;
  email: string;
  username?: string;
  account_status?: string;
  password?: string;
}

