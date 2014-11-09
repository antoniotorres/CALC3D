
"use strict";

function detectFeatures() {
  var style = document.createElement('style');
  style.textContent = '' +
     'dummyRuleForTesting {' +
     'width: calc(0px);' +
     'width: -webkit-calc(0px); }';
  document.head.appendChild(style);
  var transformCandidates = [
      'transform',
      'webkitTransform',
      'msTransform'
  ];
  var transformProperty = transformCandidates.filter(function(property) {
    return property in style.sheet.cssRules[0].style;
  })[0];
  var calcFunction = style.sheet.cssRules[0].style.width.split('(')[0];
  document.head.removeChild(style);
  return {
    transformProperty: transformProperty,
    calcFunction: calcFunction
  };
}

var features = detectFeatures();

var testCurrentTime;
var testLength = 0;
var lastRun = false;
var frameTime = 100;
var checks = [];
var interval;

document.getElementById("iframeSrc").value = window.location.search.substring(1) || "testcases/auto-test-calc.html";
document.getElementById("interval").value = "1";
document.getElementById("obProp").value = ".anim, width";


function ToCheck(object, initSelctor, properties){
  this.object = object;
  this.initSelctor = initSelctor;
  this.properties = properties;
}

function getEndTime(timeline) {
  var players = timeline.getCurrentPlayers();

  var endTime = 0;
  players.forEach(function(player) {
    endTime = Math.max(endTime, player.source.endTime);
  });
  return endTime;
}

function loadFile(mode, callback) {
  if (typeof mode == 'undefined') {
    mode = '';
  }

  var file = document.getElementById("iframeSrc").value;

  var iframe = document.getElementById("frame");
  // We want the frame to always reload even if the src is the same, hence we
  // force it to null and then to the value we want.
  iframe.onload = function() {
    iframe.onload = callback;
    iframe.src = file + '#' + mode;
  };
  iframe.src = ''; 
}

function startGeneratingExpectations() {
  var obProp = document.getElementById("obProp").value;

  var output = document.getElementById("checks");
  output.innerHTML = "";

  loadFile("message", function () {
    findElementsToCheck(obProp);

    output.innerHTML += "timing_test(function() {\n";
    var testWindow = document.getElementById("frame").contentWindow;
    var interval = parseFloat(document.getElementById("interval").value);

    var endTime = Infinity;

    var t = 0;
    while(t <= endTime) {
      if (typeof testWindow.testharness_timeline == 'undefined') {
          alert("Your page doesn't contain testharness_timline, can not generate anything!");
          return;
      }

      testWindow.testharness_timeline.setTime(t);

      // Update the endTime as it can change dependent on the running animations
      // and modifications to them.
      endTime = getEndTime(testWindow.window.document.timeline);

      generate(t);
      t += interval;
    }

    output.innerHTML += '}, "Auto generated tests");\n';
  });
}

function findElementsToCheck(rawString){
  // Put all checks into checkStack
  checks = [];
  rawString = rawString.split("\n");

  for (var x in rawString){
    rawString[x] = rawString[x].replace(/\s/g, "");
    rawString[x] = rawString[x].split(",");
    if (rawString[x][0].length == 0)
      continue;
    var object = window.frames[0].document.querySelectorAll(rawString[x][0]);
    var prop = [];
    for (var i = 1; i < rawString[x].length; i++){
      prop.push(rawString[x][i]);
    }
    checks.push(new ToCheck(object, rawString[x][0], prop));
  }
}

function generate(time){
  console.log("Generating checks for t=", time);

  // Produce checks at this time
  var outputText = "  at(" + time + ", function() {\n";
  for (var x in checks){
    var propslist = [];
    for (var i = 0; i < checks[x].object.length; i++){
      var propsPrint = "{";
      for (var j in checks[x].properties){
        var p = checks[x].properties[j];
        var isSVG = _WebAnimationsTestingUtilities._propertyIsSVGAttrib(p, checks[x].object[i]);

        if(isSVG) var props = checks[x].object[i].attributes;
        else var props = checks[x].object[i].currentStyle ||
            getComputedStyle(checks[x].object[i], null);

        if (p == 'ctm') {
          var ctm = checks[x].object[i].getCTM();
          var value = '{' + ctm.a + ', ' + ctm.b + ', ' + ctm.c + ', ' + ctm.d + ', ' + ctm.e + ', ' + ctm.f + '}'
        } else if (p == 'transform') {
          var value = props[features.transformProperty];
        } else {
          var value = isSVG ? props[p].value : props[p];
        }
        console.log("Node:", checks[x].object[i].cloneNode(), "Property:", checks[x].properties[j], "Value:", value);

        value = value.replace(/[-+]?[0-9]+\.?[0-9]*(?:[eE][-+]?[0-9]+)?/g, function(v) {
          v = Number(v);
          if (Math.abs(v) < 1e-10) {
            v = 0;
          }
          return ("" + v.toPrecision(4)).replace(/\.?0+$/, '');
        });

        propsPrint += "'"+ p + "':'" + value + "'";
        if (j < checks[x].properties.length -1) propsPrint += ",";
      }
      propsPrint += "}";
      propslist.push(propsPrint);
    }
    outputText += printCheck(checks[x].initSelctor, i, propslist, time);
  }
  outputText += '  });';
  var output = document.getElementById("checks");
  output.innerHTML += outputText + "<br>";
}

function printCheck(object, number, properties, time){

  var newCheck = '    assert_styles("' + object + '",';

  // If all the properties are the same for every object, just pass the list.
  var allsame = properties.every(function(x) { return x === properties[0] });
  if (allsame) {
    newCheck += properties[0] + ");\n";

  } else {
    // Otherwise give a list with each

    newCheck += " [\n";
    for (var j in properties) {
       newCheck += '      ' + properties[j] + ",\n";
    }
    newCheck += "    ]);\n";
  }

  return newCheck;
}
