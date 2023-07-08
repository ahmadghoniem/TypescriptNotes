"use strict";
let x = {
    contents: "hello world",
};
// we could check 'x.contents'
if (typeof x.contents === "string") {
    console.log(x.contents.toLowerCase());
}
