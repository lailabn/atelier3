const numbers = [1, 3, 4];

const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);
const result = numbers.map(factorial);
console.log(result); 
