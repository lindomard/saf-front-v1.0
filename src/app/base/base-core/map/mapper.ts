export interface Mapper<R, T> {
    mapFrom(param: R): T;
    
    mopTo(param: T): R;
}
