const myGenericFuncs = <T extends {}>(t: T) => {
  return t.toString();
};
myGenericFuncs(new Date());
console.log("lmao");
await Promise.resolve("as");
export {};
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
