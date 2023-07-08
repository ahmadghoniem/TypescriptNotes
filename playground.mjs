function f2(arg: unknown) {
  arg.toString(); // NOT OK
  if (typeof arg === "number") {
    arg.toString(); // (parameter) arg: number
  }
  if (arg instanceof Date) {
    arg.toString(); // (parameter) arg: Date
  }
}
