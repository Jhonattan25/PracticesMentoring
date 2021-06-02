let number1 = 6;
let number2 = 4.5;

console.log(sumNumbers(number1, number2));

function sumNumbers(num1, num2) {

   if( typeof(num1) === 'number' && typeof(num2) === 'number')
   return num1 + num2;

   return 'No funciona';
}