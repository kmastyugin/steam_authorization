export interface IResponseStructure<Data> {
  list: Data[],
  count: number;
  page: number;
  size: number;
}