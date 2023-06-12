let element = document.querySelector("#year") as HTMLSpanElement;
let year = new Date().getFullYear().toString();
element.textContent = year;

//Within our if check, TypeScript sees typeof padding === "number" and understands that as a
// special form of code called a type guard.

interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
