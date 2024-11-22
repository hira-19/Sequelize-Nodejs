// const students= ['ali','amina','fahmida']

const student= ['wali','amina','fahmida']

student.forEach((val)=> console.log(val + " Garg"))

// const numbers = [61, 2, 3, 4, 5];

const squaredNumbers = numbers.map(function(number) {
  return number + number;
});

console.log(squaredNumbers); 


const arrOne = [10, 20, 30, 40, 50,79];

const arrTwo = arrOne.map(function(number) {
    return number * 3;
});

const arrThree = arrTwo.filter(function(numb) {
    return numb % 2 === 0; // This filters even numbers from arrTwo
 });

console.log("Original Array:", arrOne);
console.log("Mapped Array (arrTwo):", arrTwo);
console.log("Filtered Array (arrThree):", arrThree);

// ----------------------------------------------------
const colors=['green','blue','silver']

colors.forEach(function(colored){
   console.log("They are beautful "+colored)
})

const cities = ['karachi', 'isb']

cities.forEach(function( funcst){
   console.log("These are the cities " + funcst);
})