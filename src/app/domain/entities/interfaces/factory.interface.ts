export interface IFactory<T, K> {
    create(argument: T): K;
}