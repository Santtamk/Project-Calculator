// const buttons = document.querySelectorAll('button');
const input = document.querySelector('input');
const numbers  = document.querySelectorAll('.number');
const operations  = document.querySelectorAll('.operation');
const equal  =  document.querySelector('.equal');
const point = document.querySelector('.point');
const clear = document.querySelector('.ac');
const numberDelete = document.querySelector('.delete');

let firstNumber = '';
let operatorValue = '';
let secondNumber = '';
let result = '';
let shouldReset = false;
//the below function and loop repeats the numbers
numbers.forEach((number) => {
  number.addEventListener("click", () => {
  if (!operatorValue) {
    // If no operator has been selected, append to the first number
    firstNumber += number.innerText;
  } else {
    // If an operator has been selected, append to the second number
    secondNumber += number.innerText;
  }
  input.value += number.innerText;
});
});

//the point is only displayed once, the below function checks for its existence 


point.addEventListener('click', () => {
  if (input.value === '') {
    // If the input field is empty, prepend a '0' before the point
    input.value = '0' + point.innerText;
    firstNumber += '0';
  } else {
    // Append the point to the input field
    input.value += point.innerText;
    firstNumber += point.innerText;
  }
});
//AC and delete, one clears the input field and other slices it one at a time from right to left 
clear.addEventListener("click", () =>{
  input.value = '';
  firstNumber = '';
  operatorValue = '';
  secondNumber = '';
});


numberDelete.addEventListener("click", () =>{
  input.value = input.value.slice(0, -1);

  if (!operatorValue) {
    // If no operator has been selected, update the first number
    firstNumber = firstNumber.slice(0, -1);
  } else {
    // If an operator has been selected, update the second number
    secondNumber = secondNumber.slice(0, -1);
  }

})


function operate(numOne, numTwo, operator) {
  switch (operator) {
    case '+':
      return Number(numOne) + Number(numTwo);
    case '-':
      return Number(numOne) - Number(numTwo);
    case '*':
      return Number(numOne) * Number(numTwo);
    case '/':
      return Number(numOne) / Number(numTwo);
    case '%':
      return (Number(numOne) / 100) * Number(numTwo);
    default:
      return '';
  }
}

operations.forEach((operation) => {
  operation.addEventListener('click', () => {
    if (firstNumber && secondNumber) {
      // If both numbers are entered, perform the calculation
      const result = operate(firstNumber, secondNumber, operatorValue);
      input.value = result;

      // Set the result as the new first number and clear the second number
      firstNumber = result;
      secondNumber = '';
    } else if (firstNumber) {
      // If only the first number is entered, set the operator and clear the second number
      operatorValue = operation.innerText;
      input.value += operatorValue;
      secondNumber = '';
    }
  })
})


equal.addEventListener('click', () => {
  if(firstNumber && secondNumber) {
    input.value = operate(firstNumber, secondNumber, operatorValue);
    firstNumber = operate(firstNumber, secondNumber, operatorValue);
    secondNumber = '';
    shouldReset = true;
  }
  
});

