interface Box {
  contents: unknown;
}
let x: Box = {
  contents: "hello world",
};
// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}
