export interface Page<T> {
  content?: Array<T>;
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
  size?: number;
  number?: number;
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean;
  pageable?: Pegeable;
}

export interface Pegeable {
  pageNumber?: number;
  pageSize?: number;

}