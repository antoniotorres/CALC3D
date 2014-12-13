//Gets the elements and saves them as variables
var time = parseFloat(document.querySelector('#time').value);
var weight = parseFloat(document.getElementById('weight').value);
var bCalc = document.getElementById('bCalculate');
var result = document.getElementById('result');

//function to calculate the cost
function calculate() {
  time = parseFloat(document.querySelector('#time').value);
  weight = parseFloat(document.getElementById('weight').value);
  console.log(time);
  result.value = time+weight;
}
function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
document.addEventListener('DOMContentLoaded', function() {
    // onClick's logic below:
    bCalc.addEventListener('click', function() {
        calculate();
    });
    document.querySelector('#time').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#weight').addEventListener('keypress', function() {
        validate(event);
    });
});