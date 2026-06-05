
// Đoạn 1
console.log("--- Đoạn 1 ---");
console.log(x);
var x = 5;

// Đoạn 2
console.log("\n--- Đoạn 2 ---");
let y = 10;

// Đoạn 3
console.log("\n--- Đoạn 3 ---");
const z = 15;
console.log(z);

console.log("\n--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
console.log("\n--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);