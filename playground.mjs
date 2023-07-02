let start = performance.now();
await (async () => {
  const ids = [...Array(5)].map((_, i) => i + 1); //  one liner of N number of elements starting with 1 (n+1)

  const getPost = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.json();
  };

  const arrayOfPromises = ids.map((id) => getPost(id));

  // 1. requests are made in sequence and displayed in sequence

  for (const promise of arrayOfPromises) {
    // console.log(await promise); // top level await displayed in sequence (no problem with the await promise syntax btw)
    (async () => console.log(await promise))(); // IIFE (Immediately Invoked Function Expression)
  }
})();
let end = performance.now();
console.log(end - start);
