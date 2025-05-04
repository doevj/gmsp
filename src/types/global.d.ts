type OptionT<T = string> = {
  label: string
  value: T
}

type ClassItem = {
  name: string;
  price: number;
  quantity: number;
}

type Result<T> = {
  ok: false;
  error: string;
  data?: never;
} | {
  ok: true;
  error?: never;
  data: T;
}

type AuthSuccessRes = {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

type CookiesRecord = Record<string, string | undefined>