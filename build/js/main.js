"use strict";
/** INTRO */
/**
 * if you have a problem with execution policies
 * open windows powershell and run the following command: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

 * TS is a strictly typed language while JS is loosely typed language (weakly typed language)
 * A language that is strongly typed can be either statically or dynamically typed
 * JS is a dynamically typed language this means types are checked at run time running the code to see what happens.
 * TS is a statically typed language this means types are checked at compile time and you can make predictions about what code is expected before it runs.
 *
 * TypeScript has several type-checking strictness flags that can be turned on or off
 * The strict flag in the CLI, or "strict": true in a tsconfig.json toggles them all on simultaneously, but we can
 * opt out of them individually. The two biggest ones are noImplicitAny and strictNullChecks
 *
 * TS benefits include:
 *  self-documenting
 *  catching errors in development
 *  great for teams
 *
 * */
// TYPE ANNOTATION
let myNumber = 1;
// adding type annotation to myNumber is explicitly saying that it's of type number
// let myNumber = 3; in a normal JS/TS file will infer that data type is of type number;
// When you don't specify a type, and TypeScript can't infer it from context, the compiler will typically default to any
// if you explicitly defined the type of myNumber, TS will no longer need to infer the data type
// in a JS file if you tried reassigning myNumber with a string myNumber="ahmad" it won't give you an error
// but in a TS file if you tried reassigning myNumber with a string it will give you an error: type string is not assignable to number
let ID; // ID can be either a number or a string (union type)
let isLoading; // isLoading can be either a number, string or a boolean
// and each type in this union type is referred to as union member
const sum = (a, b) => a + b;
// parameters a and b implicitly has type any if their types were not explicitly declared
//TS is inferring that sum is returning a number based on the parameters type
let idk = /\w+/g;
// TIP: you can use VS Code intellisense to know beforehand the type of data
// after hovering over idk turns out the data type for a regular expression is RegExp
// ARRAYS
let stringsArr = ["one", "hey", "Dave"];
let guitars = ["guitar", "les paul", 5150];
let mixedData = ["evh", 1984, true];
// string[] === Array<sting> you can use both
stringsArr.push(42); // Argument of type 'number' is not assignable to parameter of type 'string'
guitars[0] = 1984; // not locked in to the position of the element but rather to the types defined for the array (string|number)[]
guitars = mixedData; // because guitars is of type (string | number)[] and mixedData is of type (string | number | boolean)[] it won't allow it while the other way around will work
let test = [];
let bands = [];
bands.push("Van Halen");
// TUPLES
// A tuple is data type introduced by Typescript which is a typed array with a pre-defined length and types for each index.
// intellisense will infer the data type of both myTuple and mixed is of type (string | number | boolean)[]
// so if you need to type annotate an array as a tuple you would need to define it yourself
let myTuple = ["dave", 42, true];
let mixed = ["john", 1, false];
myTuple = mixed; // Target (destination) requires 3 element(s) but source may have fewer.
mixed = myTuple; // no problem arises
mixed[3] = "Sheko"; // mixed doesn't have a predefined length
let myName = "ahmad";
myTuple[3] = myName; // type string isn't assignable to undefined
// OBJECTS
let myObject;
myObject = {
    prop1: "ahmad",
};
myObject.prop1 = 3;
// working with union types
// TypeScript will only allow an operation if it is valid for every member of the union.
// For example, if you have the union string | number
// TS will only suggest the functions that are available on both a string and number
// like toLocaleString, valueOf, toString
const printId = (ID) => ID.toLocaleString();
// and will throw an error when you try to use a function that's available only on a string type but not a number type
const printMoreIds = (ID) => ID.toUpperCase(); // property toUpperCase doesn't exist on type number
// solution? Narrowing using type guards
// TYPE GUARDS
// JS has typeof operator that can give you very basic information about the types of values at runtime
// TypeScript expects it to return certain set of strings "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "object" | "function"
// notice that there's no null, array, NaN as typeof null & array === "object" and typeof "NaN" === "number"
// In TypeScript, checking against the value returned by typeof is a type guard i.e typeof padding === "number".
// the process of refining types to more specific type than declared is called NARROWING
// example 1
let str = "he".padStart(10, "*");
function padLeft(padding, input) {
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
function welcomePeople(x) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
        // the process of refining types to more specific type than declared is called narrowing
        //x in this code block is of type `string[]` and it was declared of type `string[] | string`
    }
    else {
        console.log("Welcome lone traveler " + x);
        //x in this code block is of type `string` and it was declared of type `string[] | string`
    }
}
// coercion to boolean using Boolean constructor and double negation
const doubleNegation = !!"hey"; // infers it to `true` as it's const
const booleanConstructor = Boolean("hey"); // infers it to `boolean` although it's const
let doubleNeg = !!"hey"; // infers it to `boolean` as it may change (let)
// Truthiness narrowing
const testFunction = (strings) => {
    // typeof param === "object") this shall narrow down param to be string[] | null as both are of type `object`
    // you might don't wanna deal with a null value and don't wanna use optional chaining operator
    // so we use Truthiness narrowing
    if (typeof strings === "object" && !!strings) {
        strings.map((ele) => console.log(ele)); // narrowed down to string[] only
        // so we won't get TypeError: null is not iterable
    }
    else {
        console.log(strings); // got narrowed down to string because it's not of type `object`
    }
};
// be careful not to wrap the whole if statement block with an if (!!strings)
// as by this you ignore falsy values like "" for strings 0n for bigints and 0 for numbers instead use (strings !== null)
/* Sometimes you'll have a union where all the members have something in common. For example,
 * both arrays and strings have a slice method. If every member in a union has a property in
 * common, you can use that property without narrowing */
// Return type is inferred as number[] | string
const getFirstThree = (x) => x.slice(0, 3);
console.log((({ lovesHoney, name }) => !lovesHoney ? name : `friendly ${name}`)({
    lovesHoney: true,
    name: "bigBear",
}));
// final notes: use type for type aliases , interface is useful for declaration merging
// using a defined type to annotate an object
const Person = {
    name: "Ahmad",
    skills: [],
};
Person.yearsOfExp = 2; // Property 'yearsOfExp' does not exist on type 'PersonType'
// you can use VS Code's Quick Fix to add yearsOfExp as a property to PersonType with it's type inferred by TS
// ENUMS
// Unlike  most TypeScript features, Enums are not a type-level addition to JavaScript
// but something added to the language and runtime.
var Grade;
(function (Grade) {
    Grade[Grade["D"] = 0] = "D";
    Grade[Grade["C"] = 1] = "C";
    Grade[Grade["B"] = 101] = "B";
    Grade[Grade["A"] = 102] = "A";
    Grade[Grade["X"] = 103] = "X";
})(Grade || (Grade = {}));
// LITERAL TYPES
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation const constantString: "Hello World"
let familyMembers; // like const but with multiple values
familyMembers = "siblings"; // intellisense will suggest the literal strings you defined for familyMembers
const handleRequest = (url, method) => "";
let req = { url: "www.example.com", method: "GET" };
// type of req object is inferred to be {url: string, method: string} rather than { url:"www...", method:"GET"}
handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"
// solution 1
let req1 = { url: "www.example.com", method: "GET" }; // readonly literal types
// solution 2
let req2 = { url: "www.example.com", method: "GET" }; // readonly literal types using as const or possible as "GET"
// solution 3
handleRequest(req.url, req.method); // using as const or possible as "GET"
// FUNCTIONS
// TypeScript allows you to specify the types of both the input and output values of functions
const greetPerson = ({ name, age }) => {
    // return type annotation
    if (Math.random() === 1)
        return `hello ${name} your age is ${age?.toFixed}`;
    // age is possibly undefined so you either use .? or make sure that it's required and not optional
    return 3 === 1 ? true : false; // no overlap between values i.e it will equate to false every time
    // without the block of code that follows the if statement
    // greetPerson would have a return type of either a string or undefined (default return type of a function)
};
greetPerson(Person, 5);
// better to use type for type aliases
const addFunc = (a, b) => a + b;
// parameters can have either ?. optional chaining for optional parameters or an initializer/default value for a parameter but not both
const subFunc = (a, b = 2, c) => {
    if (typeof c !== "undefined")
        return a - b - c;
    return a - b;
};
// optional parameters should be the last on the list of parameters
// as a required parameter cannot follow an optional parameter
// Rest parameters
const total = (...numbers) => numbers.reduce((acc, curr) => acc + curr);
// functions that explicitly throw error returns never type
const throwError = (errMsg) => {
    throw new Error(errMsg);
}; // return type inferred by TS of throwError is never type also note that you can't return throwing an error hence why the return type is never
// but you can return the error itself if you  replaced throw with return
// TYPE ASSERTIONS/COERCION
// sometimes you have information about a type of a value that TS can't know about
// for example when using document.getElementById TS know this will return some kind of HTMLElement
// but you know for a fact that it's going to return HTMLImageElement or HTMLCanvasElement
// in this case you can use type assertion to specify a more specific type or sometimes a less specific type
let image = document.querySelector("img"); // (HTMLImageElement | null)
image.src; // TS Error: image' is possibly 'null'.
let myImage = document.querySelector("img"); // more specific
// TIP: if it's between a type | null you can add Non-null Assertion Operator (Postfix ! ) at the end to eliminate the possibility of it being null or undefined
myImage = document.querySelector("img");
// you can also use angle-bracket syntax but not in react with .tsx files
myImage = document.querySelector("img");
let nickNames = ["ahmad", "sheko", "ghogho"];
let names = nickNames; // assertion to less specific
/* TypeScript only allows type assertions which convert to a more specific or less specific version of a
type. This rule prevents "impossible" coercions like */
let realName = nickNames; // assertion to very specific
// solution: forced casting or double casting using any or unknown
realName = nickNames;
// use case for a type coercion
const addOrConcat = (a, b, method) => (method === "concat" ? "" + a + b : a + b);
let addition = addOrConcat(2, 3, "add"); // 5
// be careful: TS sees no problem with this as you are telling it that you know better than it does when it comes to the output type
let concatenation = addOrConcat(2, 3, "concat"); // "23" this shall return a string and you are coercing it as if it's returning a number