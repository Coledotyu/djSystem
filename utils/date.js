let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

let time = year + '-' + month + '-' + day;

module.exports = time;
