export interface ApiAnswer<T> {
    offset: number;
    limit: number;
    total: number;
    result: T[];
  }