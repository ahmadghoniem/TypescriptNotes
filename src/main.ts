/* 
- if you have a problem with execution policies

> open windows powershell and run the following command:  
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

- TS is a strictly typed language while JS is loosely typed language (weakly typed language)

- A language that is strongly typed can be either statically or dynamically typed
- JS is a dynamically typed language this means types are checked at run time running the code to see what happens.
- TS is a statically typed language this means types are checked at compile time and you can make predictions about what code is expected before it runs.

- TypeScript has several type-checking strictness flags that can be turned on or off
- The strict flag in the CLI, or "strict": true in a tsconfig.json toggles them all on simultaneously, but we can
- opt out of them individually. The two biggest ones are noImplicitAny and strictNullChecks

- TS benefits include:
* self-documenting
* catching errors in development
* great for teams

*/

// >> TYPE ANNOTATION <<

let myNumber: number = 1;
// adding type annotation to myNumber is explicitly saying that it's of type number
// let myNumber = 3; in a normal JS/TS file will infer that data type is of type number;
// When you don't specify a type, and TypeScript can't infer it from context, the compiler will typically default to any

// if you explicitly defined the type of myNumber, TS will no longer need to infer the data type
// in a JS file if you tried reassigning myNumber with a string myNumber="ahmad" it won't give you an error
// but in a TS file if you tried reassigning myNumber with a string it will give you an error: type string is not assignable to number

let ID: number | string; // ID can be either a number or a string (union type)
let isLoading: number | string | boolean; // isLoading can be either a number, string or a boolean
// and each type in this union type is referred to as union member

const sum = (a: number, b: number) => a + b;
// parameters a and b implicitly has type any if their types were not explicitly declared
//TS is inferring that sum is returning a number based on the parameters type

let idk: RegExp = /\w+/g;
// TIP: you can use VS Code intellisense to know beforehand the type of data
// after hovering over idk turns out the data type for a regular expression is RegExp

// >> ARRAYS <<

let stringsArr: Array<string> = ["one", "hey", "Dave"];
let guitars: (string | number)[] = ["guitar", "les paul", 5150];
let mixedData: Array<string | number | boolean> = ["evh", 1984, true];
// string[] === Array<sting> you can use both

stringsArr.push(42); // Argument of type 'number' is not assignable to parameter of type 'string'
guitars[0] = 1984; // not locked in to the position of the element but rather to the types defined for the array (string|number)[]
guitars = mixedData; // because guitars is of type (string | number)[] and mixedData is of type (string | number | boolean)[] it won't allow it while the other way around will work

let test: any[] = [];
let bands: string[] = [];
bands.push("Van Halen");

//  >>TUPLES<<
/**
 * A tuple is data type introduced by Typescript which is a typed array with a pre-defined length and types for each index.
 * intellisense will infer the data type of both myTuple and mixed is of type (string | number | boolean)[]
 * so if you need to type annotate an array as a tuple you would need to define it yourself  */

let myTuple: [string, number, boolean] = ["dave", 42, true];
let mixed = ["john", 1, false];

myTuple = mixed; // Target (destination) requires 3 element(s) but source may have fewer.
mixed = myTuple; // no problem arises

mixed[3] = "Sheko"; // mixed doesn't have a predefined length
let myName = "ahmad";
myTuple[3] = myName; // type string isn't assignable to undefined

//  >>OBJECTS<<

let myObject: Object;

myObject = {
  prop1: "ahmad",
};

myObject.prop1 = 3;
// by default prop1 data type will be inferred as a string and type number isn't assignable to string

// Type Aliases
type primitives = string | number | boolean;

// working with union types

// TypeScript will only allow an operation if it is valid for every member of the union.
// For example, if you have the union string | number
// TS will only suggest the functions that are available on both a string and number
// like toLocaleString, valueOf, toString

const printId = (ID: string | number) => ID.toLocaleString();
// and will throw an error when you try to use a function that's available only on a string type but not a number type
const printMoreIds = (ID: number | string) => ID.toUpperCase(); // property toUpperCase doesn't exist on type number

// solution? Narrowing using type guards

// >Type Guards<

// JS has `typeof` operator that can give you very basic information about the types of values at runtime
// TypeScript expects it to return certain set of strings "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "object" | "function"
// notice that there's no null, array, NaN as typeof null & array === "object" and typeof "NaN" === "number"
// In TypeScript, checking against the value returned by typeof is a type guard i.e typeof padding === "number".

// the process of refining types to more specific type than declared is called >Narrowing<

// example 1
let str = "he".padStart(10, "*");
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
    //padding in this code block is of type `number` and it was declared of type `number | string`
  }
  return padding + input;
  //padding in this code block is of type `string` and it was declared of type `number | string`
}

// example 2
// Within our if check, TypeScript sees typeof `Array.isArray(x)` and understands that
// it's a special form of code called a type guard.

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log("Hello, " + x.join(" and "));
    // the process of refining types to more specific type than declared is called narrowing
    //x in this code block is of type `string[]` and it was declared of type `string[] | string`
  } else {
    console.log("Welcome lone traveler " + x);
    //x in this code block is of type `string` and it was declared of type `string[] | string`
  }
}

// coercion to boolean using Boolean constructor and double negation

const doubleNegation = !!"hey"; // infers it to `true` as it's const
const booleanConstructor = Boolean("hey"); // infers it to `boolean` although it's const
let doubleNeg = !!"hey"; // infers it to `boolean` as it may change (let)

// >>Truthiness narrowing<<

const testFunction = (strings: string | string[] | null) => {
  // typeof param === "object") this shall narrow down param to be string[] | null as both are of type `object`
  // you might don't wanna deal with a null value and don't wanna use optional chaining operator
  // so we use Truthiness narrowing
  if (typeof strings === "object" && !!strings) {
    strings.map((ele: string) => console.log(ele)); // narrowed down to string[] only
    // so we won't get TypeError: null is not iterable
  } else {
    console.log(strings); // got narrowed down to string because it's not of type `object`
  }
};

// WARNING: be careful not to wrap the whole if statement block with an if (!!strings)
// as by this you ignore falsy values like "" for strings 0n for bigints and 0 for numbers instead use (strings !== null)

// >>in operator narrowing<<
// The JavaScript in operator is used to check if a specified property exists in an object or in its inherited properties (in other words, its prototype chain)
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
  } else {
    animal;
  }
}
// >>instanceof narrowing<<

// in JavaScript x instanceof Foo checks whether the prototype chain of x contains Foo.prototype
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x:Date
  } else {
    console.log(x.toUpperCase()); // x:string
  }
}
// >>type predicates<<
let pet: Fish | Bird =
  Math.random() < 0.5 ? { swim: () => {} } : { fly: () => {} };

// To define a user-defined type guard, we simply need to define a function whose return type is a type predicate
// A type predicate takes the form `parameterName is Type` in our case pet is Fish
function isFish(pet: Fish | Bird): pet is Fish {
  let coercedType = pet as Fish;
  return coercedType.swim !== undefined;
}
// coercing pet(an object) to be of type Fish then check if swim property is defined
// coercedType.swim !== undefined is same as "swim" in coercedType

// right now we have our own type guard (hover over pet)
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

/* Sometimes you'll have a union where all the members have something in common. For example,

- both arrays and strings have a slice method. If every member in a union has a property in
- common, you can use that property without narrowing */

// Return type is inferred as number[] | string
const getFirstThree = (x: number[] | string) => x.slice(0, 3);

// Annotate a type for object properties
type stringOrNumberArray = (string | number)[]; // type aliases can be used for defining types of object properties

// 1st using type keyword
type PersonType = {
  name: string;
  age?: number; // same as age: boolean | undefined
  skills: stringOrNumberArray; // you can use a type alias inside of another type alias
};

// 2nd using interface keyword
interface PersonInterface {
  name: string;
  age?: number;
  skills: stringOrNumberArray;
}

// > differences between an interface and a type <

// 1. you can't define a type alias using an interface but you can use a type alias inside of it
// 2. a type cannot be re-opened to add new properties vs an interface which is always extendable.

// extending an interface

interface AnimalInterface {
  name: string;
}
interface BearInterface extends AnimalInterface {
  lovesHoney: boolean;
}
// adding new properties to a Type

type AnimalType = {
  name: string;
};
type BearType = AnimalType & {
  lovesHoney: boolean;
};

console.log(
  (({ lovesHoney, name }: BearInterface | BearType): string =>
    !lovesHoney ? name : `friendly ${name}`)({
    lovesHoney: true,
    name: "bigBear",
  })
);

// 3. declaration merging will work with interfaces but not with types

interface shirtInterface {
  color: string;
}
interface shirtInterface {
  size: number;
}

type shirtType = {
  color: string;
};
// Duplicate identifier 'shirtType'.
type shirtType = {
  size: number;
};

// final NOTE: use type for type aliases , interface is useful for declaration merging

// using a defined type to annotate an object
const Person: PersonType = {
  name: "Ahmad",
  skills: [],
};

Person.yearsOfExp = 2; // Property 'yearsOfExp' does not exist on type 'PersonType'
// you can use VS Code's Quick Fix to add yearsOfExp as a property to PersonType with it's type inferred by TS

// >ENUMS<

// Unlike most TypeScript features, Enums are not a type-level addition to JavaScript
// but something added to the language and runtime.

enum Grade {
  D, // 0
  C, // 1
  B = 101,
  A, // 102
  X, // 103
}

// >LITERAL TYPES<

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation const constantString: "Hello World"

let familyMembers: "dad" | "mom" | "siblings"; // like const but with multiple values
familyMembers = "siblings"; // intellisense will suggest the literal strings you defined for familyMembers
// The type boolean itself is actually just an alias for the union true | false

// >LITERAL INFERENCE<

// When you initialize a variable with an object, TypeScript assumes that the properties of that object
// might change values later so if it's of type string it infers it's type to be a string rather than assigning a type literal.

interface handleRequestType {
  (a: string, b: "GET" | "POST"): any;
}
const handleRequest: handleRequestType = (url, method) => "";

let req = { url: "www.example.com", method: "GET" };
// type of req object is inferred to be {url: string, method: string} rather than { url:"www...", method:"GET"}

handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"

// solution 1
let req1 = { url: "www.example.com", method: "GET" } as const; // readonly literal types
// solution 2
let req2 = { url: "www.example.com", method: "GET" as const }; // readonly literal types using as const or possible as "GET"
// solution 3
handleRequest(req.url, req.method as "GET"); // using as const or possible as "GET"

// >FUNCTIONS<

// TypeScript allows you to specify the types of both the input and output values of functions

const greetPerson = ({ name, age }: PersonType): string | boolean => {
  // return type annotation
  return `hello ${name} your age is ${age?.toFixed}`;
  // 'age' is possibly 'undefined' if you are okay with it being undefined in this case
  //add ?. optional chaining operator or make sure that it's provided

  if (age !== undefined) return `hello ${name} your age is ${age.toFixed}`;
  //this makes sure that age isn't undefined

  if (age != undefined) return `hello ${name} your age is ${age.toFixed}`;
  // but age might bu null | undefined
  // you can use loose equality to get rid of null and undefined

  if (age) return `hello ${name} your age is ${age.toFixed}`;
  // this will get rid of both null and undefined but falsy values will equate to false as will such as 0 and ""

  // without any return greetPerson would have a return type of either a string or boolean (default return type of a function)
};

greetPerson(Person, 5);
// Even if you don't have type annotations on your parameters (parameters are of any type),
// TypeScript will still check that you passed the right number of arguments.

// >TYPE ANNOTATION: FUNCTIONS<

// using type keyword
type mathFunctionType = (a: number, b: number) => number;

// using interface keyword
interface mathFunctionInterface {
  (a: number, b: number): number;
}
// better to use type for type aliases
const addFunc: mathFunctionInterface | mathFunctionType = (a, b) => a + b;
// parameters can have either ?. optional chaining for optional parameters or an initializer/default value for a parameter but not both
const subFunc = (a: number, b: number = 2, c?: number) => {
  if (typeof c !== "undefined") return a - b - c;
  return a - b;
};

// NOTE: optional parameters should be the last on the list of parameters
// as a required parameter cannot follow an optional parameter

// Rest parameters
const total = (...numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr);

// >>Never Type<<

// functions that explicitly throw error or causes infinity loop returns never type
//  also it's possible when narrowing that you reduce the options of a union to a point where you have removed all
//  possibilities and have nothing left. In those cases, TypeScript will use a never type to represent a
//  state which shouldn't exist */

const getRevealBalloons = (gender: "male" | "female") => {
  let color: string;
  if (gender === "male") {
    color = "blue";
    return `it's a boy🎉, getting you ${color} balloons`;
  } else if (gender === "female") {
    color = "violet";
    return `it's a girl🎉, getting you ${color} balloons`;
  } else {
    const exhaustiveCheck: never = gender;
    // gender is of type never as all of it's possibilities have been handled
    // so it's assignable to exhaustiveCheck which is of type never
    // as type never is assignable only to type never
    return exhaustiveCheck;
  }
  //throw new Error("this shouldn't have happened");
  // while(true){}
};

// >TYPE ASSERTIONS/COERCION<

// sometimes you have information about a type of a value that TS can't know about
// for example when using document.getElementById TS know this will return some kind of HTMLElement
// but you know for a fact that it's going to return HTMLImageElement or HTMLCanvasElement
// in this case you can use type assertion to specify a more specific type or sometimes a less specific type

let image = document.querySelector("img"); // (HTMLImageElement | null)
let src: string = image.src; // TS Error: image' is possibly 'null'.

// >>Non-null Assertion Operator<<

// Of we have a value and it's type is between type | null | undefined
// you can add Non-null Assertion Operator (Postfix !) at the end to eliminate the possibility of it being null or undefined

src = image!.src; // before the Non-null Assertion Operator we had an error 'image' is possibly 'null'
src = image?.src; // before the Non-null Assertion Operator we had an error 'image' is possibly 'null'

let myImage = document.querySelector("img") as HTMLImageElement; // more specific
myImage = document.querySelector("img")!;

// you can also use angle-bracket syntax but not in react with .tsx files
myImage = <HTMLImageElement>document.querySelector("img");

// another example of converting to more or less specific type
type names = string[];
type nickNames = ["ahmad", "sheko", "ghogho"];
type realName = "ahmad";

let nickNames: nickNames = ["ahmad", "sheko", "ghogho"];
let names = nickNames as names; // assertion to less specific

// TypeScript only allows type assertions which convert to a more specific or less specific version of a
// type. This rule prevents "impossible" coercions like

let realName = nickNames as realName; // assertion to very specific

// solution: forced casting or double casting using any or unknown
realName = nickNames as any as realName;
// use case for a type coercion
const addOrConcat = (
  a: number,
  b: number,
  method: "add" | "concat"
): string | number => (method === "concat" ? "" + a + b : a + b);

let addition: number = addOrConcat(2, 3, "add") as number; // 5

// WARNING: TS sees no problem with this as you are telling it that you know better than it does when it comes to the output type
let concatenation: number = addOrConcat(2, 3, "concat") as number; // "23" this shall return a string and you are coercing it as if it's returning a number

//  >CLASSES<

class Coder {
  name: string; // you need the property to exist in the class as a member
  music: string;
  age: number;
  lang: string; //Property 'music' has no initializer and is not definitely assigned in the constructor.ts(2564)

  // properties and methods are called members
  constructor(name: string, music: string, age: number, lang: string) {
    this.name = name; // and you also need it in the constructor
    this.music = music; // and you also need it in the constructor
    this.age = age; // and you also need it in the constructor
    this.lang = lang; // and you also need it in the constructor
  }
  // visibilty modifier as public // visibility members
}
