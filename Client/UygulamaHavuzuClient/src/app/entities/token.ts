export interface Token {
    accessToken: string;       // JWT token'ın kendisi
    tokenExpireDate: string;   // Token'ın geçerlilik süresi (ISO formatında tarih)
  }
  