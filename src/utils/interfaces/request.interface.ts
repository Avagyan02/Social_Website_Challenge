import { CookieModel } from "../models/cookie.model";

export interface ReqInterface extends Request {
  cookies: CookieModel;
  user: number;
}