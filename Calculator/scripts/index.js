let number1;
let number2;
let sign;
let exit;

do {
  number1 = parseInt(prompt("Digite el primer numero"));
  number2 = parseInt(prompt("Digite el segundo numero"));
  sign = prompt(
    "Para efectos de esta calculdora suma = 1; resta = 2; multi = 3; division = 4; modulo = 5"
  );

  switch (sign) {
    case "1":
      console.log(calculateSumNumbers(number1, number2));
      break;
    case "2":
      console.log(calculateSubtraction(number1, number2));
      break;
    case "3":
      console.log(calculateMultiply(number1, number2));
      break;
    case "4":
      console.log(calculateDivision(number1, number2));
      break;
    case "5":
      console.log(calculateModule(number1, number2));
      break;

    default:
      console.log("La operación no es valida");
      break;
  }

  exit = prompt(
    'Digite "S" si desea salir de la calculadora, si no, presione enter para continuar'
  );
} while (exit !== "S" && exit !== "s");

console.log("Gracias por usar nuestra calculadora");

function calculateSumNumbers(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number") return num1 + num2;

  return "Números no válidos";
}

function calculateSubtraction(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number") return num1 - num2;

  return "Números no válidos";
}

function calculateMultiply(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number") return num1 * num2;

  return "Números no válidos";
}

function calculateDivision(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number" && num2 !== 0)
    return num1 / num2;

  return "Números no válidos";
}

function calculateModule(num1, num2) {
  if (typeof num1 === "number" && typeof num2 === "number" && num2 !== 0)
    return num1 % num2;

  return "Números no válidos";
}
