"use strict";
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
// > ARRAYS <
let stringsArr = ["one", "hey", "Dave"];
let guitars = ["guitar", "les paul", 5150];
let mixedData = ["evh", 1984, true];
// string[] === Array<sting> (generic) you can use both
stringsArr.push(42); // Argument of type 'number' is not assignable to parameter of type 'string'
guitars[0] = 1984; // not locked in to the position of the element but rather to the types defined for the array (string|number)[]
guitars = mixedData; // because guitars is of type (string | number)[] and mixedData is of type (string | number | boolean)[] it won't allow it while the other way around will work
// >> Any Type <<
// In TypeScript, the any type is a special type that represents values that can be of any type.
// It is a dynamic type that essentially disables type checking for the variable or expression it is applied to
// think of it as a type that can dynamically cast itself to match any other type when you try assigning it.
// By pushing band_311 which os of any type to bands array, you are effectively discarding the type safety provided by TypeScript
let testArr = [311];
const [band_311] = testArr; // band_311 is of type any
let bands = []; // bands array elements are of type string
bands.push(band_311); // IS OK
//  >TUPLES<
/**
 * A tuple is data type introduced by Typescript which is a typed array with a pre-defined length and types for each index.
 * intellisense will infer the data type of both myTuple and mixed is of type (string | number | boolean)[]
 * so if you need to type annotate an array as a tuple you would need to define it yourself  */
let myTuple = ["dave", 42, true];
let mixed = ["john", 1, false];
myTuple = mixed; // Target (destination) requires 3 element(s) but source may have fewer.
mixed = myTuple; // no problem arises
mixed[3] = "Sheko"; // mixed doesn't have a predefined length
let myName = "ahmad";
myTuple[2] = myName; // type string isn't assignable to boolean
myTuple[3] = myName; // Tuple type '[string, number, boolean]' of length '3' has no element at index '3'
//  >OBJECTS<
let myObject;
myObject = {
    prop1: "ahmad",
};
myObject.prop1 = 3;
// >> working with union types <<
/* TypeScript will only allow an operation if it is valid for every member of the union.
For example, if you have the union string | number
TS will only suggest the functions that are available on both a string and number
like toLocaleString, valueOf, toString */
const printId = (ID) => ID.toLocaleString();
// and will throw an error when you try to use a function that's available only on a string type but not a number type
const printMoreIds = (ID) => ID.toUpperCase(); // property toUpperCase doesn't exist on type number
// SOLUTION? Narrowing using type guards
// >Type Guards<
// JS has `typeof` operator that can give you very basic information about the types of values at runtime
// TypeScript expects it to return certain set of strings "string" | "number" | "boolean" | "bigint" | "symbol" | "undefined" | "object" | "function"
// notice that there's no null, array, NaN as typeof null & array === "object" and typeof "NaN" === "number"
// In TypeScript, checking against the value returned by typeof is a type guard i.e typeof padding === "number".
// the process of refining types to more specific type than declared is called >Narrowing<
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
// NOTE: Optional chaining denoted by the ?.operator is a feature in Javascript
// that allows developers to safely access properties and methods of an object without triggering a runtime error if the object is null or undefined
// So if any of the properties or methods in the chain is undefined, the expression evaluates to undefined, rather than triggering a runtime error.
// >>Truthiness narrowing<<
const testFunction = (strings) => {
    // typeof param === "object") this shall narrow down param to be string[] | null as both are of type `object`
    // you might don't wanna deal with a null value and don't wanna use optional chaining operator
    // so we use Truthiness narrowing strings !== null or !!strings to ignore falsy values like undefined or null
    if (typeof strings === "object" && strings !== null) {
        strings.map((ele) => console.log(ele)); // narrowed down to string[] only
        // so we won't get TypeError: null is not iterable
    }
    else {
        console.log(strings); // got narrowed down to string because it's not of type `object`
    }
};
function move(animal) {
    if ("swim" in animal) {
        animal;
    }
    else {
        animal;
    }
}
// >>instanceof narrowing<<
// in JavaScript x instanceof Date checks whether the prototype chain of x contains Date.prototype
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString()); // x:Date
    }
    else {
        console.log(x.toUpperCase()); // x:string
    }
}
// >>user-defined type guard with type predicates<<
let pet = Math.random() < 0.5 ? { swim: () => { } } : { fly: () => { } };
// To define a user-defined type guard, we simply need to define a function whose return type is a type predicate
// A type predicate takes the form `parameterName is Type` in our case pet is Fish
function isFish(pet) {
    let coercedType = pet;
    return coercedType.swim !== undefined;
}
// coercing pet(an object) to be of type Fish then check if swim property is defined
// coercedType.swim !== undefined is same as "swim" in coercedType
// right now we have our own type guard (hover over pet)
if (isFish(pet)) {
    // isFish(pet) returns boolean
    pet.swim();
}
else {
    pet.fly();
}
/* Sometimes you'll have a union where all the members have something in common. For example,
- both arrays and strings have a slice method. If every member in a union has a property in
- common, you can use that property without narrowing */
// Return type is inferred as number[] | string
const getFirstThree = (x) => x.slice(0, 3);
string | number; // not applicable
let myShirt = { color: "red", size: 32 };
// using a defined type to annotate an object
const Person = {
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
var Grade;
(function (Grade) {
    Grade[Grade["D"] = 0] = "D";
    Grade[Grade["C"] = 1] = "C";
    Grade[Grade["B"] = 68] = "B";
    Grade[Grade["A"] = 69] = "A";
})(Grade || (Grade = {}));
// JS CODE OUTPUT
var Grade; // undefined
(function (Grade) {
    // Grade has been assigned to an empty object as it was previously undefined.
    // each Enum member has a reverse mapping where the property name is assigned to the associated value.
    Grade[Grade["D"] = 0] = "D";
    // Grade["D"] = 0; Assigns the value 0 to the key "D" in the Grade object,    
    // Additionally, assigns the value "D" to the property 0 in the Grade object achieving reverse mapping.
    Grade[Grade["B"] = 68] = "B";
    Grade[Grade["A"] = 69] = "A";
})(Grade || (Grade = {}));
// Grade || (Grade = {}) is a common technique in JavaScript to provide a default value for a variable if it is falsy or undefined
// >LITERAL TYPES<
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation const constantString: "Hello World"
let familyMembers; // like const but with multiple values
familyMembers = "siblings"; // intellisense will suggest the literal strings you defined for familyMembers
const handleRequest = (url, method) => { };
let req = { url: "www.example.com", method: "GET" };
// type of req object is inferred to be {url: string, method: string} rather than { url:"www...", method:"GET"}
handleRequest(req.url, req.method); // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"
// solution 1
let req1 = { url: "www.example.com", method: "GET" }; // readonly literal types for both the url and method props
// solution 2
let req2 = { url: "www.example.com", method: "GET" }; // readonly literal type for method prop using as const or possibly as "GET"
// solution 3
handleRequest(req.url, req.method); // using as const or possibly as "GET" while passing the function's argument
// >FUNCTIONS<
// TypeScript allows you to specify the types of both the input and output values of functions
const greetPerson = ({ name, age }) => {
    // return type annotation
    return `hello ${name} your age is ${age?.toFixed}`;
    // 'age' is possibly 'undefined' if you are okay with it being undefined in this case
    // add ?. optional chaining operator so the expression can evaluate to undefined if the property doesn't exist in the object
    // or use the non null assertion operator or make sure that it's provided
    if (age !== undefined)
        return `hello ${name} your age is ${age.toFixed}`;
    //this makes sure that age isn't undefined
    if (age != undefined)
        return `hello ${name} your age is ${age.toFixed}`;
    // but age might be null | undefined
    // you can use `loose equality `to get rid of null and undefined
    if (age)
        return `hello ${name} your age is ${age.toFixed}`;
    // this will get rid of both null and undefined but falsy values will equate to false as will. such as 0 and ""
    // without any return greetPerson would have a return type of undefined which isn't assignable to string | boolean and will throw an error
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
// NOTE: optional parameters should be the last on the list of parameters
// as a required parameter cannot follow an optional parameter
// A rest parameter must be last in a parameter list
const total = (init = 0, ...numbers) => numbers.reduce((acc, curr) => acc + curr, init);
// >>Never Type<<
// functions that explicitly throw error or causes infinity loop returns never type
//  also it's possible when narrowing that you reduce the options of a union to a point where you have removed all
//  possibilities and have nothing left. In those cases, TypeScript will use a never type to represent a
//  state which shouldn't exist */
const getRevealBalloons = (gender) => {
    let color;
    if (gender === "male") {
        color = "blue";
        return `it's a boy🎉, getting you ${color} balloons`;
    }
    else if (gender === "female") {
        color = "violet";
        return `it's a girl🎉, getting you ${color} balloons`;
    }
    else {
        // gender is of type never as all of it's possibilities have already been handled
        return gender;
    }
    //throw new Error("this shouldn't have happened");
    // while(true){}
};
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
// as you know there's two ways to access a property in an object
console.log(todaysTransactions.Pizza); // dot notation
console.log(todaysTransactions["Pizza"]); // bracket notation
let prop = "Pizza";
console.log(todaysTransactions[prop]);
// when accessing properties with variable key it's important to specify
// an index signature because prop is inferred to be of type string while there's no way to tell which types the key takes
// NOTE: an object key is either a string | number
// >TYPE ASSERTIONS/COERCION<
// sometimes you have information about a type of a value that TS can't know about
// for example when using document.getElementById TS know this will return some kind of HTMLElement
// but you know for a fact that it's going to return HTMLImageElement or HTMLCanvasElement
// in this case you can use type assertion to specify a more specific type or sometimes a less specific type
let image = document.querySelector("img"); // (HTMLImageElement | null)
let src = image.src; // TS Error: image' is possibly 'null'.
// >>Non-null Assertion Operator<<
// The purpose of the non-null assertion operator is to tell the compiler that a variable or expression is guaranteed to have a non-null value at runtime.
// if we have a union type of any_type | null | undefined
// you can add Non-null Assertion Operator (Postfix !) to eliminate the possibility of it being either null or undefined
src = image.src; // before the Non-null Assertion Operator we had an error 'image' is possibly 'null'
src = image?.src; // The optional chaining operator is used to safely access properties that may not exist,
// ensuring that the expression evaluates to undefined if the property is not available. However, in this case,
// `src` is expected to be of type string and cannot accept undefined.
let myImage = document.querySelector("img"); // more specific
myImage = document.querySelector("img");
// you can also use angle-bracket syntax but not in react with .tsx files
myImage = document.querySelector("img");
let nickNames = ["ahmad", "sheko", "ghogho"];
let names = nickNames; // assertion to less specific
// TypeScript only allows type assertions which convert to a more specific or less specific version of a
// type. This rule prevents "impossible" coercions like
let realName = nickNames; // assertion to very specific
// solution: forced casting or double casting using any or unknown
// NOTE: In TypeScript, any value can be assigned to the “unknown” type,
// but without a type assertion, “unknown” can’t be assigned to anything but itself
realName = nickNames;
// use case for a type coercion
const addOrConcat = (a, b, method) => (method === "concat" ? "" + a + b : a + b);
let addition = addOrConcat(2, 3, "add"); // 5
// WARNING: TS sees no problem with this as you are telling it that you know better than it does when it comes to the output type
let concatenation = addOrConcat(2, 3, "concat"); // "23" this shall return a string and you are coercing it as if it's returning a number
// >CLASSES<
// https://www.typescriptlang.org/docs/handbook/2/classes.html
// read the notes added in the handbook
// worth noting that
class Animal {
    name; // a class field/property
    // there's no difference between the two terms but
    // The term "field" was used so it could cover both public and private (since private fields are not properties)
    age = 25; // already initialized with a value
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
    initialize() { }
    // overwrote the initialize function thus failing to initialize the name field/property
    constructor(name) {
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
    name;
    initializeByLibrary() {
        this.name = "dog";
    }
}
const dog = new Dog();
console.log(dog.name);
