export class Stack<T> {
  private stack: T[];

  public constructor() {
    this.stack = new Array<T>();
  }

  public isEmpty(): boolean {
    return this.stack.length === 0;
  }

  public push(newItem: T): void {
    this.stack.push(newItem);
  }

  public pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    return this.stack.pop();
  }

  public toString(): string {
    return this.isEmpty() ? '0' : this.stack.join('');
  }
}
