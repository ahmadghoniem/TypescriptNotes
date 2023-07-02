/* interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate()); */
/* type objType = { x: number; y: number };

function fixStr(str: string): objType {
  let elements: string[] = str.split(",");
  let coord: objType = { x: 0, y: 0 };
  for (const ele of elements) {
    const [key, value] = ele.split(":");
    coord[key as keyof objType] = parseInt(value, 10  );
  }
  return coord;
}
console.log(fixStr()); */

/* type objType = { [x: string]: number };
type arrType = objType[];

function fixStr(str: string): arrType {
  let elements: string[] = str.split(",");
  let arrOfObj = elements
    .map((e) => e.split(":"))
    .map(([key, value]) => ({ [key]: parseInt(value) }));
  console.log(elements.map((e) => e.split(":")));
  return arrOfObj;
}
console.log(fixStr("x:3,y:4")); */
/* let z = 2222;
let m = 2222;
class Base {
  protected m = 10;
  public z: number = 5;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
console.log(m); // OK
 */
/* interface type {
  readonly [key: string]: string | number | undefined;
  name: string;
  age?: number;
}
let obj: type = {
  name: "ahmad",
  age: 23,
};
console.log(obj.sheko); */

// checking assigning any to another type

let myNameTest: string = "ahmad";
let anyType: any = 3;
myNameTest = anyType;

(async () => {
  let res = await fetch("../test.json");
  return res;
})().then((res) => console.log());

/* let testArr: any[] = [311];
const [band_311] = testArr; // band_311 is of type any
let bands: string[] = []; // bands array elements are of type string

bands.push(band_311); */
/* function greeter(fn: (a: string) => void) {
  fn("Hello, World");
  }
 */
//

const element = document.querySelector("button");

function handleClick(this: HTMLButtonElement, event: Event) {
  // ✅ this = HTMLButtonElement
  console.log(this.innerText);
}

element.addEventListener("click", () => handleClick());
