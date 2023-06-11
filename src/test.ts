let element = document.querySelector("#year") as HTMLSpanElement;
let year = new Date().getFullYear().toString();
element.textContent = year;

//Within our if check, TypeScript sees typeof padding === "number" and understands that as a
// special form of code called a type guard.

const value = "Hello";

interface Container {
  value: number | null | undefined;
  }
  function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
  console.log(container.value);
  // Now we can safely multiply 'container.value'.
  container.value *= factor;
  }
  }