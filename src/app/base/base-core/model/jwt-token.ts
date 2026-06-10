export interface JwtToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  jti: string;
}

export enum JwtTokenEnum {
  TOKEN_ID = 'token_id',
  USER_PAYLOAD = 'user_payload',
  ACCESS_TOKEN = 'access_token',
  COMPANY_ID = 'company_id',
  COMPANY_NAME = 'company_name',
  DATE_EXPIRED = 'date_expired'
}
