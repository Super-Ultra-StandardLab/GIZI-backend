export class ListResponse<T> {
  private list: T[];

  constructor(list: T[]) {
    this.list = list;
  }

  public static of<T>(list: T[]): ListResponse<T> {
    return new ListResponse(list);
  }

  public getList(): T[] {
    return this.list;
  }
}
