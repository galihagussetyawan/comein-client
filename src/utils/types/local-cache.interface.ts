import { Response } from "./response.interface";

export interface LocalCacheData<T> {
  url: string;
  expires: string;
  data: Response<T>;
}
