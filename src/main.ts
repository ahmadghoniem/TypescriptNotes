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

// > TYPE ANNOTATION <

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

// > ARRAYS <

let stringsArr: Array<string> = ["one", "hey", "Dave"];
let guitars: (string | number)[] = ["guitar", "les paul", 5150];
let mixedData: Array<string | number | boolean> = ["evh", 1984, true];
// string[] === Array<sting> (generic) you can use both

stringsArr.push(42); // Argument of type 'number' is not assignable to parameter of type 'string'
guitars[0] = 1984; // not locked in to the position of the element but rather to the types defined for the array (string|number)[]
guitars = mixedData; // because guitars is of type (string | number)[] and mixedData is of type (string | number | boolean)[] it won't allow it while the other way around will work

// >> Any Type <<
// In TypeScript, the any type is a special type that represents values that can be of any type.
// It is a dynamic type that essentially disables type checking for the variable or expression it is applied to
// think of it as a type that can dynamically cast itself to match any other type when you try assigning it.

// By pushing band_311 which os of any type to bands array, you are effectively discarding the type safety provided by TypeScript
let testArr: any[] = [311];
const [band_311] = testArr; // band_311 is of type any
let bands: string[] = []; // bands array elements are of type string

bands.push(band_311); // IS OK

//  >TUPLES<
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
myTuple[2] = myName; // type string isn't assignable to boolean
myTuple[3] = myName; // Tuple type '[string, number, boolean]' of length '3' has no element at index '3'

//  >OBJECTS<

let myObject: Object;

myObject = {
  prop1: "ahmad",
};

myObject.prop1 = 3;
// by default prop1 data type will be inferred as a string and type number isn't assignable to string
// this also goes for variables

// > Type Aliases <
type primitives = string | number | boolean;

// >> working with union types <<

/* TypeScript will only allow an operation if it is valid for every member of the union.
For example, if you have the union string | number
TS will only suggest the functions that are available on both a string and number
like toLocaleString, valueOf, toString */

const printId = (ID: string | number) => ID.toLocaleString();
// and will throw an error when you try to use a function that's available only on a string type but not a number type
const printMoreIds = (ID: number | string) => ID.toUpperCase(); // property toUpperCase doesn't exist on type number

// SOLUTION? Narrowing using type guards

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

// NOTE: Optional chaining denoted by the ?.operator is a feature in Javascript
// that allows developers to safely access properties and methods of an object without triggering a runtime error if the object is null or undefined
// So if any of the properties or methods in the chain is undefined, the expression evaluates to undefined, rather than triggering a runtime error.

// >>Truthiness narrowing<<

const testFunction = (strings: string | string[] | null) => {
  // typeof param === "object") this shall narrow down param to be string[] | null as both are of type `object`
  // you might don't wanna deal with a null value and don't wanna use optional chaining operator
  // so we use Truthiness narrowing strings !== null or !!strings to ignore falsy values like undefined or null

  if (typeof strings === "object" && strings !== null) {
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
// in JavaScript x instanceof Date checks whether the prototype chain of x contains Date.prototype

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x:Date
  } else {
    console.log(x.toUpperCase()); // x:string
  }
}
// >>user-defined type guard with type predicates<<

let pet = Math.random() < 0.5 ? { swim: () => {} } : { fly: () => {} };
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
  // isFish(pet) returns boolean
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
/* Type aliases and interfaces are very similar, and in many cases you can choose between them freely.
Almost all features of an interface are available in type , the key distinction is that a type
cannot be re-opened to add new properties vs an interface which is always extendable.
also you can't define a type alias using an interface but you can using the type keyword */

type stringOrNumberType = string | number;
interface stringOrNumber { string | number};  // not applicable

// extending an interface
interface AnimalInterface {
  name: string;
}
interface BearInterface extends AnimalInterface {
  lovesHoney: boolean;
}

// Extending a type via intersections
type AnimalType = {
  name: string;
};
type BearType = AnimalType & {
  lovesHoney: boolean;
};

// declaration merging will work with interfaces but not with types

interface shirtInterface {
  color: string;
}
interface shirtInterface {
  size: number;
  color:number; // overriding with another type will result in an error
}
let myShirt:shirtInterface = {color:"red",size:32}; 
// if either of color or size properties are missing it will result in an error 

type shirtType = {
  color: string;
};
// Duplicate identifier 'shirtType'.
type shirtType = {
  size: number;
};


// using a defined type to annotate an object
const Person: PersonType = {
  name: "Ahmad",
  skills: [],
};

Person.yearsOfExp = 2; // Property 'yearsOfExp' does not exist on type 'PersonType'
// you can use VS Code's Quick Fix to add yearsOfExp as a property to PersonType with it's type inferred by TS

// NOTE: use type for type aliases and make use of interface for declaration merging and defining object types.

// >ENUMS<

// Unlike most TypeScript features
// Enums are not a type-level addition to JavaScript.
// but it's a feature that goes beyond types and extends into the actual JavaScript language itself during runtime.

// TS
enum CompassDirection1 {
  North,
  East,
  South,
  West,
}
console.log(CompassDirection);


// JS OUTPUT

var CompassDirection; // undefined
(function (CompassDirection) {
  CompassDirection[(CompassDirection["North"] = 0)] = "North";
  // CompassDirection["North"] = 0 evaluates to 0 Assigning the value 0
  // to the key "North" in CompassDirection object.

  // Additionally, assigns the value "North" to the property 0
  // in the CompassDirection object achieving reverse mapping.

  CompassDirection[(CompassDirection["East"] = 1)] = "East";
  CompassDirection[(CompassDirection["South"] = 2)] = "South";
  CompassDirection[(CompassDirection["West"] = 3)] = "West";
})(CompassDirection || (CompassDirection = {}));

// CompassDirection|| (CompassDirection= {}) is a common technique in JavaScript.
// which provides a default value for a variable if it is falsy or undefined

console.log(CompassDirection);
// {0: 'Up', 1: 'Down', 2: 'Left', 3: 'Right', Up: 0, Down: 1, Left: 2, Right: 3}

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
  (a: string, b: "GET" | "POST"): void;
}
const handleRequest: handleRequestType = (url, method) => {};

let req = { url: "www.example.com", method: "GET" };
// type of req object is inferred to be {url: string, method: string} rather than { url:"www...", method:"GET"}

handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"

// solution 1
let req1 = { url: "www.example.com", method: "GET" } as const; // readonly literal types for both the url and method props
// solution 2
let req2 = { url: "www.example.com", method: "GET" as const }; // readonly literal type for method prop using as const or possibly as "GET"
// solution 3
handleRequest(req.url, req.method as "GET"); // using as const or possibly as "GET" while passing the function's argument

// >FUNCTIONS<

// TypeScript allows you to specify the types of both the input and output values of functions

const greetPerson = ({ name, age }: PersonType): string | boolean => {
  // return type annotation
 
  return `hello ${name} your age is ${age?.toFixed}`;
  // 'age' is possibly 'undefined' if you are okay with it being undefined in this case
  // add ?. optional chaining operator so the expression can evaluate to undefined if the property doesn't exist in the object
  // or use the non null assertion operator or make sure that it's provided

  if (age !== undefined) return `hello ${name} your age is ${age.toFixed}`;
  //this makes sure that age isn't undefined

  if (age != undefined) return `hello ${name} your age is ${age.toFixed}`;
  // but age might be null | undefined
  // you can use `loose equality `to get rid of null and undefined

  if (age) return `hello ${name} your age is ${age.toFixed}`;
  // this will get rid of both null and undefined but falsy values will equate to false as will. such as 0 and ""

  // without any return greetPerson would have a return type of undefined which isn't assignable to string | boolean and will throw an error
};

greetPerson(Person, 5);
// Even if you don't have type annotations on your parameters (parameters are of `any` type),
// TypeScript will still check that you passed the right number of arguments.
// NOTE: log method on the console object has a rest parameter of type ...data:any[]
// which means that that the rest parameter which is an array will hold any type of values console.log("ahmad",3,{age:32})

// >>FUNCTIONS: TYPE ANNOTATION<<

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

// WARNING: optional parameters should be the last on the list of parameters
// as a required parameter cannot follow an optional parameter.
// because you will need to explicitly pass undefined in place of the optional parameters in order to pass the rest.

// A rest parameter must be last in a parameter list
const total = (init: number = 0, ...numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, init);


// >>FUNCTIONS: PARAMETER DESTRUCTURING<<

// parameters have implicitly type 'any'
// b has been defaulted to 100 so the inferred type is no longer 'any' but 'number'
const addFuncDestructure = ({ a: number, b = 100, c }) => {
  return a + b + c;
};
// NOTE: you can't annotate types within destructuring patterns as it already means something in javascript.
// In an object destructuring pattern, a: number means "grab the property a and redefine
// it locally as a variable named number. so you will get the error 'number' is declared but its value is never read.


// >>FUNCTIONS: SIGNATURE<<
// The function signature consists of 1.method name and 2.the number of arguments the function requires.

/** In JavaScript, functions can have properties in addition to being callable. However, the function type
 * expression syntax [function () {}] doesn't allow for declaring properties. If we want to describe something callable
 * with properties, we can write a call signature in an object type: */
// read more (if you need to) on page 58.

// >>FUNCTIONS: INDEX/KEY SIGNATURE<<
// Sometimes you don't know all the names of a type's properties ahead of time, but you do know how they would look like.
// In those cases you can use an index signature to describe the types of possible values,
// read page 84 & this as well: https://dev.to/afrazkhan/typescript-index-signature-4npo


// >>FUNCTIONS: OVERLOADING<<

/** JavaScript doesn’t support overloaded functions.
 * Overloaded functions are functions having the same name but different signatures, that is, the number of the arguments.
 * For example , you might wanna write a function to produce a Date that takes either a timestamp (one argument) or a
 * month/day/year specification (three arguments).
 * In TypeScript, we can specify a function that can be called in different ways by writing overload signatures. */

// To do this, write some number of function signatures , followed by the body of the function
interface Coordinate {
    [key: string]:  number,
  x: number;
  y: number;
}
// function signatures
function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;

// body of the actual function
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "string") {
    // arg1 narrowed down to string so it's safe to use split
    (arg1).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as keyof Coordinate] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate), // bec you are eventually returning coord and the return type needs to be of type Coordinate
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 52, y: 35 }));
console.log(parseCoordinate("x:12,y:22"));

// NOTE: Always prefer parameters with union types instead of overloads when possible why? check page 70.


// >>FUNCTIONS: Optional Parameters in Callbacks<<
// check page 66 with the comments


// >>FUNCTIONS: using `this` as a parameter<<

// JS specification states that you cannot define a parameter called 'this'
// so it uses that syntax space to let you  declare the type for this in the function body.
// you need to remember that arrow function don't have a 'this' of their own

// in JS (this is a TS file so you won't get the error mentioned)
function usingThisAsParam(this) {
console.log(this); // SyntaxError: Unexpected token 'this'
}

//  We need to be explicit in places where TypeScript is unaware of its surroundings.
const element = document.querySelector("button") as HTMLButtonElement; // typeof element === "object"
function handleClick(this: HTMLButtonElement, event: Event) {
  // 'this' implicitly has type 'any' because it does not have a type annotation
  console.log(this.innerText);
}

  // 'this' isn't to be mistaken as a real param as it's going to be removed
  // just like type annotations gets removed when it gets compiled down to js
  element.addEventListener("click", handleClick);
// NOTE: if you are going to specify a type for this keyword it needs to be the very first parameter.

// >never Type<
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
    // gender is of type never as all of it's possibilities have already been handled
    return gender;
    
  }
  //throw new Error("this shouldn't have happened");
  // while(true){}
};

// >unknown Type<

// The unknown type represents any value. This is similar to the any type, but is safer.
// because you cannot directly perform operations on an unknown parameter without first narrowing its type or performing type checks.
// unlike any which essentially disables type checking so you will be able to use the parameter before narrowing defies the purpose of type safety. 
// You need to explicitly handle type checking or assertions before using the value.

// it's very useful in overloads as well (check overloads)

function f1(arg: any) {
  arg.toString(); // OK
}
function f2(arg: unknown) {
  arg.toString(); // NOT OK
  if (typeof arg === "number") {
    arg.toString(); // (parameter) arg: number
  }
  if (arg instanceof Date) {
    arg.toString(); // (parameter) arg: Date
  }
}

// >empty object {} Type<

// https://www.totaltypescript.com/the-empty-object-type-in-typescript
// The empty type {} describes an object that has no property on its own.
// but Instead of representing an empty object, {} represents any value except null and undefined.
// so if you attempted to assign an object with property there won't be a problem.
// however you won't be able to access it which renders {} somehow useless.

const example1: {} = "str";
const example2: {} = 123;
const example3: {} = true;
const example4: {} = {
  foo: "whatever",
};
example4.foo;

// >>empty object {} Type with generics<<

// can be used as a constraint in a generic function.
const myGenericFunc = <T extends {}>(t: T) => {
return t;
};
 
const result1 = myGenericFunc("str");
const result2 = myGenericFunc(123);
const result3 = myGenericFunc(true);
const result4 = myGenericFunc(null); // Argument of type 'null' is not assignable to parameter of type '{}'

// NOTE: To represent an empty object, use Record<string, never> instead (check Utility types).
// 

// >TYPE ASSERTIONS/COERCION<

// sometimes you have information about a type of a value that TS can't know about
// for example when using document.getElementById TS know this will return some kind of HTMLElement
// but you know for a fact that it's going to return HTMLImageElement or HTMLCanvasElement
// in this case you can use type assertion to specify a more specific type or sometimes a less specific type

let image = document.querySelector("img"); // (HTMLImageElement | null)
let src: string = image.src; // TS Error: image' is possibly 'null'.

// >>Non-null Assertion Operator<<

// The purpose of the non-null assertion operator is to tell the compiler that a variable or expression is guaranteed to have a non-null value at runtime.
// if we have a union type of any_type | null | undefined
// you can add Non-null Assertion Operator (Postfix !) to eliminate the possibility of it being either null or undefined

src = image!.src; // before the Non-null Assertion Operator we had an error 'image' is possibly 'null'

src = image?.src; // The optional chaining operator is used to safely access properties that may not exist,
// ensuring that the expression evaluates to undefined if the property is not available. However, in this case,
// `src` is expected to be of type string and cannot accept undefined.


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
// NOTE: In TypeScript, any value can be assigned to the “unknown” type,
// but without a type assertion, “unknown” can’t be assigned to anything but itself

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

// >CLASSES<
// https://www.typescriptlang.org/docs/handbook/2/classes.html
// read the notes added in the handbook
// worth noting that
class Animal {
  name: string; // a class field/property
  // there's no difference between the two terms but
  // The term "field" was used so it could cover both public and private (since private fields are not properties)

  age: number = 25; // already initialized with a value
  constructor(name) {
    this.initialize(); // not recommended
    this.name = name; // recommended
  }
  initialize() {
    this.name = "Animal";
  }
}
/**
 * if you are using a function invocation to initialize a property in the constructor
 * TypeScript compiler's strictPropertyInitialization flag may raise an error, as it does not recognize that the property is properly initialized by a method.
 * Furthermore, when considering derived classes, there is a possibility that these methods can be overridden in derived classes,
 * leading to potential failures in initializing the members correctly. */

class Dog extends Animal {
  initialize() {}
  // overwrote the initialize function thus failing to initialize the name field/property

  constructor(name: string) {
    super(name);
    this.name = name;
  }

  // scenario 2
  initialize() {
    this.name = "dog";
  }
  // even though the name property was initialized, if you are not using the null assertion operator
  // strictPropertyInitialization flag may raise an error.

  // but if you are using a library and that library is going to fill some of the properties for you
  // you can add a null assertion operator !
  // Not initialized, but no error
  name!: string;

  initializeByLibrary() {
    this.name = "dog";
  }
}

const dog = new Dog();
console.log(dog.name);

// >GENERICS< 

// generics allow for a placeholder / a type variable

const echoString = (arg:string):string => arg; // specific to a string but what if we wanted a generic echo
const echo = <T>(arg:T):T => arg; // generic echo where you can pass any type you want

// imagine you have a function that will be returning  
function getElement<Type,Index extends Array<Type>.length>(arr: Type[],  index:  number)  {
  return arr[index];
  }
const arr = ["str","",""];
arr.at()
  console.log(firstElement(arr,""));


const isObj = <T>(arg:T):boolean => (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
// NOTE: echo and isObj won't aren't custom type guards and won't behave as type guard 
// because a custom type guard needs to have a return type of ParamName is `type` (string) using the `is` testing operator

interface BoolCheck<T> {
  value: T,
  is: boolean,
}

const isTrue = <T>(arg:T):BoolCheck<T> => {
  if (typeof arg  === 'object' && arg !== null && Object.keys(arg as keyof T).length === 0)  {

    // WARNING: the order is crucial in this if statement as having object.keys before arg !== null 
    // will break the code because calling Object.keys static method on a null value will result in an Uncaught TypeError
    return {value:  arg, is:  false }
  }
  else if (typeof arg  === 'object' && Array.isArray(arg) && arg.length === 0)  {
    return {value:  arg, is:  false }
  } 
  return {value:  arg, is:  !!arg }
}

// 

interface hasID {
  id:number
}

const processUser = <T extends hasID>(user:  T):T => {
  return user;
}
console.log(processUser({id:1,name:"hello"})); // if you passed an object that doesn't have an id prop you will get an error

const getUsersProps = <T extends hasID,K extends keyof T>(users: T[], key: K):T[K][] => {
  return users.map(user => user[key]); 
  // also because key Param is extending keys of T which are the user's data there's no need to coerce the type of key as keyof T
  // which is another use case of generics
}
const userArray = [{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
    }
  }
,{
  "id": 2,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
      }
  },
  "phone": "1-770-736-8031 x56442",
  "doppie":"do",
  "website": "hildegard.org",
  "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
  }
}]
console.log(getUsersProps(userArray,"phone")); // using K as a type for key or even keyof T will infer the keys of the users being passed in the 1st Param

// >>GENERICS: CLASSES<<

class stateObject<T> {
  private data: T
  constructor(value:T) {
    this.data = value
  }
   get state():T {
    return this.data;
   }
   set state(value: T) {
    this.data = value;
   }
}
const inferredStore = new stateObject("inferred string"); // before passing "string" the generic T was of type unknown
const genericStore = new stateObject<string>("non inferred string"); // before passing "string" the generic T was of type string as specified 

inferredStore.state = "dave"; // type has been inferred to be string
store.state = 12; //since the type has been inferred to be string assigning it to a number will cause an error

// same as the example below
let string = "";
string = 2;

// >>GENERICS: Specifying Type Arguments<<
// TypeScript can usually infer the intended type arguments in a generic call, but not always. 
// For example, let's say you wrote a function to combine two arraysز

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
  }
  
  combine(["STRING"],[0]); // inferred generic type is string based on the 1st argument
    // Type 'string' is not assignable to type 'number'

  combine([0],["STRING"]);     // inferred generic type is number based on the 1st argument
  // Type 'number' is not assignable to type 'string'

  // to solve this 
  const combinedArr = combine<string | number>([1, 2, 3], ["hello"]); // specifying Type argument instead of relying on Typescript to infer it

// NOTE: When possible, use the type parameter itself rather than constraining it
// NOTE: Always use as few generic type parameters as possible

