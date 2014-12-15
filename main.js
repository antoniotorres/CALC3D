//Gets the elements and saves them as variables
var time = parseFloat(document.querySelector('#time').value);
var weight = parseFloat(document.getElementById('weight').value);
var bCalc = document.getElementById('bCalculate');
var bSave = document.getElementById('bSave');
var result = document.getElementById('result');

var fWeight = parseFloat(document.getElementById('f_weight').value);
var fCost = parseFloat(document.getElementById('f_cost').value);
var eCost = parseFloat(document.getElementById('e_cost').value);
var eUse = parseFloat(document.getElementById('e_use').value);

var v_fCost=0.0;
var v_fWeight=0.0;
var v_eCost=0.0;
var v_eUse=0.0;

//function to calculate the cost
function calculate() {
  time = parseFloat(document.querySelector('#time').value);
  weight = parseFloat(document.getElementById('weight').value);
  var costWatt = ( 2.917/1000.0)*360*time;
  result.value = time+weight;
  chrome.storage.sync.set({'filament_weight': weight}, function() {
     message('Settings saved');
  });
  chrome.storage.sync.get("filament_weight", function (obj) {
    console.log(obj);
  });
}

//This validates that the data posted are numbers only
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
//function to save settings
function save() {
  fWeight = parseFloat(document.getElementById('f_weight').value);
  fCost = parseFloat(document.getElementById('f_cost').value);
  eCost = parseFloat(document.getElementById('e_cost').value);
  eUse = parseFloat(document.getElementById('e_use').value);
  chrome.storage.sync.set({'filament_weight': fWeight}, function() {});
  chrome.storage.sync.set({'filament_cost': fCost}, function() {});
  chrome.storage.sync.set({'e_cost': eCost}, function() {});
  chrome.storage.sync.set({'e_use': eUse}, function() {});
  console.log("Saved Succesfully");
}
//function to update settings to screen
function update() {
  chrome.storage.sync.get("filament_weight", function (obj) {
    document.getElementById('f_weight').value=obj.filament_weight+'';
  });
  chrome.storage.sync.get("filament_cost", function (obj) {
    document.getElementById('f_cost').value=obj.filament_cost+'';
  });
  chrome.storage.sync.get("e_cost", function (obj) {
    document.getElementById('e_cost').value=obj.e_cost+'';
  });
  chrome.storage.sync.get("e_use", function (obj) {
    document.getElementById('e_use').value=obj.e_use+'';
  });
}
function sync() {
  chrome.storage.sync.get("filament_weight", function (obj) {
    f=obj.filament_weight+'';
  });
  chrome.storage.sync.get("filament_cost", function (obj) {
    document.getElementById('f_cost').value=obj.filament_cost+'';
  });
  chrome.storage.sync.get("e_cost", function (obj) {
    document.getElementById('e_cost').value=obj.e_cost+'';
  });
  chrome.storage.sync.get("e_use", function (obj) {
    document.getElementById('e_use').value=obj.e_use+'';
  });
}

//This looks up for the events in the screen
document.addEventListener('DOMContentLoaded', function() {
    // onClick's logic below:
    bCalc.addEventListener('click', function() {
        calculate();
    });
    bSave.addEventListener('click', function() {
        save();
    });
    document.querySelector('#time').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#weight').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#f_weight').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#f_cost').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#e_cost').addEventListener('keypress', function() {
        validate(event);
    });
    document.querySelector('#e_use').addEventListener('keypress', function() {
        validate(event);
    });
    update();
});