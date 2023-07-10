"use strict";
// utility function use it to generate the notes
function generateNotes(exp, symbols, exclude) {
    let nNotesArray = [...Array(exp)].map((_, i) => 2 ** i);
    const finalArr = [];
    for (const symbol of symbols) {
        finalArr.push(...nNotesArray.map((note) => `${note}${symbol}`));
    }
    return finalArr.filter((ele) => exclude.includes(ele) === false);
}
console.log(generateNotes(7, ["n", "t"], ["1t", "2t"]));
// (12) ['1n', '2n', '4n', '8n', '16n', '32n', '64n', '4t', '8t', '16t', '32t', '64t']
const myNotes = [
    "1n",
    "2n",
    "4n",
    "8n",
    "16n",
    "32n",
    "64n",
    "4t",
    "8t",
    "16t",
    "32t",
    "64t",
];
// type requiredType = "1n" | "2n" | "4n" | "8n" | "16n" | "32n" | "64n" | "4t" | "8t" | "16t" | "32t" | "64t"
