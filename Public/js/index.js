// jshint esversion:6
var date= new Date();
var minute=date.getMinutes();
if ((minute%2)!=0) {
    var image = document.querySelector('img').setAttribute("src","images/3.png");
} else {
    var image = document.querySelector('img').setAttribute("src","images/1.png");
}