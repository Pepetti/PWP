const date = new Date();
const days = date.getDate().toString();
const month = (date.getUTCMonth() + 1).toString();
const year = date.getUTCFullYear().toString();

const formatted = days + month + year;

console.log(formatted);

const month2 = date.getUTCMonth() + 1;
console.log(month2);
const year2 = date.getUTCFullYear();
console.log(year2);
